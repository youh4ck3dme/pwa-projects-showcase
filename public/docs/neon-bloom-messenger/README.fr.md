# 🌸 Neon Bloom Messenger (Version Française)

> Écosystème de communication premium, haute performance et sécurisé.

Neon Bloom Messenger est une infrastructure de communication complète conçue pour la confidentialité, la rapidité et l'esthétique brutaliste-premium. Basé sur le protocole **Matrix** et propulsé par **Elysia (Bun)** et **React**.

---

## 🚀 Écosystème en Direct

| Service | URL | Description |
| :--- | :--- | :--- |
| **🌐 Frontend** | [h4ck3d.cloud](https://h4ck3d.cloud) | Interface utilisateur principale |
| **⚡ API** | [api.h4ck3d.cloud](https://api.h4ck3d.cloud) | Backend haute performance |
| **💬 Matrix** | [matrix.h4ck3d.cloud](https://matrix.h4ck3d.cloud) | Protocole de communication décentralisé |
| **📁 Files** | [files.h4ck3d.cloud](https://files.h4ck3d.cloud) | Stockage sécurisé (MinIO) |
| **🛡️ Admin** | [admin.h4ck3d.cloud](https://admin.h4ck3d.cloud) | Gestion du serveur Matrix (Synapse) |

---

## ✨ Fonctionnalités Clés

- **🔐 Chiffrement de bout en bout**: Communication sécurisée via protocole Matrix.
- **🚀 Backend ultra-rapide**: Fonctionne sur ElysiaJS et Bun pour une latence minimale.
- **🎨 UI Brutalist Premium**: Design unique combinant puissance et élégance.
- **📁 Stockage intégré**: Téléversement sécurisé de fichiers via MinIO compatible S3.
- **🔄 Mises à jour automatiques**: Géré via l'outil Watchtower.
- **🛡️ Contrôle total**: Contrôle complet sur vos données et votre infrastructure.

---

## 🛠️ Technologies

### Frontend
- **Framework**: React (Vite)
- **Runtime**: Bun
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion

### Backend & Infra
- **Core**: ElysiaJS (Bun)
- **Base de données**: PostgreSQL + Redis
- **Protocole**: Matrix Synapse
- **Proxy**: Caddy (SSL automatique)
- **Fichiers**: MinIO

---

## 🚢 Déploiement (VPS)

```bash
# 1. Empaqueter le code
tar --exclude='node_modules' --exclude='.git' -cvf bundle.tar .

# 2. Envoyer sur le serveur
scp bundle.tar root@194.182.87.6:/root/

# 3. Sur le serveur
mkdir -p neon-bloom-messenger
tar -xvf bundle.tar -C neon-bloom-messenger/
cd neon-bloom-messenger
chmod +x scripts/*.sh
./scripts/deploy.sh
```

---

Développé avec ❤️ par l'équipe Neon Bloom.