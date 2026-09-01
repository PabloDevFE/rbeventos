from __future__ import annotations

import csv
import math
import re
from pathlib import Path

import pandas as pd


SOURCE = Path(r"C:\Users\Admin\Downloads\Lista de participantes - 1_Circuito_de_corrida_de_rua_de_Sete_Lagoas (3286269) (6).xlsx")
OUTPUT_DIR = Path(__file__).parent / "contatos-hostinger"
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def clean(value: object) -> str:
    if pd.isna(value):
        return ""
    return str(value).strip()


def main() -> None:
    data = pd.read_excel(SOURCE, header=7)
    contacts: list[dict[str, str]] = []
    seen: set[str] = set()
    discarded = 0
    duplicates = 0

    for _, row in data.iterrows():
        email = clean(row["Email"]).lower()
        if not EMAIL_PATTERN.fullmatch(email):
            discarded += 1
            continue
        if email in seen:
            duplicates += 1
            continue
        seen.add(email)
        contacts.append(
            {
                "First Name": clean(row["Nome"]),
                "Last Name": clean(row["Sobrenome"]),
                "Email": email,
            }
        )

    if not contacts:
        raise RuntimeError("Nenhum endereço de e-mail válido foi encontrado.")
    if len(contacts) > 200:
        raise RuntimeError(f"Foram encontrados {len(contacts)} contatos: divida a lista em mais de dois lotes.")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    split_at = math.ceil(len(contacts) / 2)
    batches = (contacts[:split_at], contacts[split_at:])
    for index, batch in enumerate(batches, start=1):
        output = OUTPUT_DIR / f"lote-{index}-hostinger.csv"
        with output.open("w", encoding="utf-8-sig", newline="") as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=["First Name", "Last Name", "Email"])
            writer.writeheader()
            writer.writerows(batch)

    summary = OUTPUT_DIR / "resumo.txt"
    summary.write_text(
        "Contatos preparados para importação no Hostinger\n"
        f"Total de participantes na planilha: {len(data)}\n"
        f"Contatos válidos e únicos: {len(contacts)}\n"
        f"Linhas sem e-mail válido: {discarded}\n"
        f"Registros repetidos removidos: {duplicates}\n"
        f"Lote 1: {len(batches[0])} contatos\n"
        f"Lote 2: {len(batches[1])} contatos\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
