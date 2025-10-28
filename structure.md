# Schéma de la base de données - Application designer

## Choix technique
- **Base de données** : MongoDB  
- **ODM** : Mongoose (Node.js)  
- **Backend** : Express  
- **Frontend** : Pug (avec Bootstrap 5 Admin Theme)  
- **Authentification** : Passport.js (local strategy, sessions)
- **Statistiques** : Chart.js  

---

## Collection : `users`

| Champ | Type | Description |
|-------|------|--------------|
| `_id` | ObjectId | Identifiant unique MongoDB |
| `email` | String (unique) | Email de connexion |
| `passwordHash` | String | Mot de passe haché (bcrypt) |
| `name` | String | Nom complet |
| `role` | String | `"designer"` ou `"admin"` |
| `createdAt`, `updatedAt` | Date | Gestion automatique par Mongoose |

---

## Collection : `suppliers` (entreprises)

| Champ | Type | Description |
|-------|------|--------------|
| `_id` | ObjectId | Identifiant unique |
| `name` | String | Nom de l’entreprise (ex: `BBois`, `MetaLo`, `pPlastique`) |
| `contact` | Objet | `{ email, téléphone }` |
| `notes` | String | Informations diverses |
| `createdAt`, `updatedAt` | Date | Dates automatiques |

---

## Collection : `materials` (matières premières)

| Champ | Type | Description |
|-------|------|--------------|
| `_id` | ObjectId | Identifiant unique |
| `name` | String | Nom de la matière (ex: `frêne`, `acier inox`) |
| `type` | String | Catégorie (`Bois`, `Fer`, `Plastique`) |
| `supplier` | ObjectId → `suppliers` | Référence à l’entreprise fournisseuse |
| `unit` | String | Unité de mesure (`kg`, `m²`, etc.) |
| `description` | String | Description facultative |
| `keywords` | [String] | Mots-clés cliquables |
| `createdAt`, `updatedAt` | Date | Dates automatiques |

---

## Collection : `categories` (catégories de meubles)

| Champ | Type | Description |
|-------|------|--------------|
| `_id` | ObjectId | Identifiant unique |
| `name` | String | Nom de la catégorie (`Armoire`, `Étagère`, etc.) |
| `description` | String | Description facultative |

---

## Collection : `furniture` (meubles / réalisations)

| Champ | Type | Description |
|-------|------|--------------|
| `_id` | ObjectId | Identifiant unique |
| `name` | String | Nom du meuble conçu |
| `category` | ObjectId → `categories` | Référence vers la catégorie |
| `materials` | [Subdocument] | Liste des matériaux utilisés |
| → `material` | ObjectId → `materials` | Matière utilisée |
| → `quantity` | Number | Quantité utilisée |
| → `unit` | String | Unité de mesure |
| → `notes` | String | Notes complémentaires |
| `tags` | [String] | Mots-clés de recherche |
| `designPlans` | String | URL ou chemin du plan de conception |
| `quantity_produced` | Number | Nombre de meubles produits |
| `createdBy` | ObjectId → `users` | Créateur (designer) |
| `createdAt`, `updatedAt` | Date | Dates automatiques |

---

## Relations entre collections
users ─────┐
│
▼
furniture.createdBy → users

furniture.category → categories

furniture.materials.material → materials

materials.supplier → suppliers

### Diagramme simplifié (vue conceptuelle)

┌────────────┐ ┌────────────┐
│ suppliers │◄─────│ materials │
└────────────┘ └────────────┘
▲
│
┌────────────┐ ┌────────────┐
│ categories │◄─────│ furniture │─────► users
└────────────┘ └────────────┘

yaml
Copier le code
