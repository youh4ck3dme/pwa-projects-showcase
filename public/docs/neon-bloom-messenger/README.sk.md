# 🌸 Neon Bloom Messenger (Slovenská verzia)

> Prémiový, vysoko výkonný a bezpečný komunikačný ekosystém.

Neon Bloom Messenger je kompletná komunikačná infraštruktúra navrhnutá pre súkromie, rýchlosť a brutaline-prémiovú estetiku. Postavený na protokole **Matrix** a poháňaný technológiami **Elysia (Bun)** a **React**.

---

## 🚀 Živý Ekosystém

| Služba | URL | Popis |
| :--- | :--- | :--- |
| **🌐 Frontend** | [h4ck3d.cloud](https://h4ck3d.cloud) | Hlavné používateľské rozhranie |
| **⚡ API** | [api.h4ck3d.cloud](https://api.h4ck3d.cloud) | Výkonný Backend |
| **💬 Matrix** | [matrix.h4ck3d.cloud](https://matrix.h4ck3d.cloud) | Decentralizovaný komunikačný protokol |
| **📁 Files** | [files.h4ck3d.cloud](https://files.h4ck3d.cloud) | Bezpečné úložisko (MinIO) |
| **🛡️ Admin** | [admin.h4ck3d.cloud](https://admin.h4ck3d.cloud) | Správa Matrix servera (Synapse) |

---

## ✨ Kľúčové Vlastnosti

- **🔐 End-to-End Šifrovanie**: Bezpečná komunikácia cez protokol Matrix.
- **🚀 Ultra-rýchly Backend**: Beží na ElysiaJS a Bun pre minimálnu latenciu.
- **🎨 Brutalist Premium UI**: Unikátny dizajn spájajúci silu a eleganciu.
- **📁 Integrované Úložisko**: Bezpečné nahrávanie súborov cez S3-kompatibilné MinIO.
- **🔄 Automatické Aktualizácie**: Spravované pomocou nástroja Watchtower.
- **🛡️ Plná Kontrola**: Máte plnú kontrolu nad svojimi dátami a infraštruktúrou.

---

## 🛠️ Technológie

### Frontend
- **Framework**: React (Vite)
- **Runtime**: Bun
- **Styling**: Tailwind CSS + shadcn/ui
- **Animácie**: Framer Motion

### Backend & Infra
- **Core**: ElysiaJS (Bun)
- **Databáza**: PostgreSQL + Redis
- **Protokol**: Matrix Synapse
- **Proxy**: Caddy (Automatické SSL)
- **Súbory**: MinIO

---

## 🚢 Nasadenie (VPS)

```bash
# 1. Zabalenie kódu
tar --exclude='node_modules' --exclude='.git' -cvf bundle.tar .

# 2. Odoslanie na server
scp bundle.tar root@194.182.87.6:/root/

# 3. Na serveri
mkdir -p neon-bloom-messenger
tar -xvf bundle.tar -C neon-bloom-messenger/
cd neon-bloom-messenger
chmod +x scripts/*.sh
./scripts/deploy.sh
```

---

Vyvinuté s ❤️ tímom Neon Bloom.