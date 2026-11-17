# TP Noté : Programmation Orientée Objet en TypeScript

## Sommaire

- [TP Noté : Programmation Orientée Objet en TypeScript](#tp-noté--programmation-orientée-objet-en-typescript)
  - [Sommaire](#sommaire)
  - [Consignes](#consignes)
  - [Exercice 1 : La classe `Weapon` (5 points)](#exercice-1--la-classe-weapon-5-points)
  - [Exercice 2 : La classe abstraite `Character` (8 points)](#exercice-2--la-classe-abstraite-character-8-points)
  - [Exercice 3 : Les classes `Warrior` et `Wizard` (7 points)](#exercice-3--les-classes-warrior-et-wizard-7-points)

Dans ce TP noté, on quitte les Pokémon pour un **jeu de rôle**. Des personnages s'équipent d'armes et s'affrontent. Il en existe deux sortes, les **guerriers** et les **sorciers**, et chacune a ses propres règles.

Le code est vérifié par des **tests unitaires**, fournis dans le projet de départ. Il mobilise les notions vues aux TP4 et TP5 : **classes**, **attributs et méthodes**, **encapsulation**, **membres statiques**, **composition**, **héritage** et **classes abstraites**.

```
Weapon                          une arme et son bonus d'attaque
Character (abstraite)           ce qui est commun à tous les personnages
├── Warrior                     un guerrier, qui entre en rage quand il est blessé
└── Wizard                      un sorcier, qui se soigne grâce à son mana
```

---

## Consignes

- **Documents autorisés** : le cours, vos TP et les recherches sur le web hors IA.
- Le **projet de départ** est fourni : l'ouvrir dans l'éditeur, puis lancer `npm install` dans le terminal. Les tests se trouvent dans le dossier `tests/` et **ne doivent pas être modifiés**.
- Chaque classe est écrite dans **son propre fichier**, dans `src/`, et exportée avec `export`.
- La correction se fera sur les mêmes tests unitaires qui vous sont fournis. Les tests sont regroupés par fonctionnalité, et chaque groupe indique entre parenthèses les points qu'il rapporte. Les points d'un groupe sont répartis à parts égales entre ses tests.
- **Rendu** : un dépôt GitHub public sur votre compte avec le contenu du dossier `src/`, dont l'URL est envoyée à l'adresse mail indiquée.

---

## Exercice 1 : La classe `Weapon` (5 points)

### Objectif

Écrire une classe simple qui représente une arme et le bonus d'attaque qu'elle apporte.

### Instructions

1. Créer un fichier `src/Weapon.ts` et y déclarer un type exporté `WeaponKind`, qui n'accepte que les valeurs `'sword'`, `'axe'`, `'staff'` et `'dagger'`.

2. Dans ce même fichier, créer une classe exportée `Weapon`, qui contient les éléments suivants.

**Attributs**

| Attribut      | Type         | Visibilité | Lecture seule | Rôle                                   |
| ------------- | ------------ | ---------- | ------------- | -------------------------------------- |
| `name`        | `string`     | public     | oui           | Le nom de l'arme.                      |
| `kind`        | `WeaponKind` | public     | oui           | Le type d'arme.                        |
| `attackBonus` | `number`     | public     | oui           | Le bonus d'attaque apporté par l'arme. |

**Constructeur**

Le constructeur a pour signature `public constructor(name: string, kind: WeaponKind, attackBonus: number)`. Si le bonus d'attaque est négatif, il lève une erreur avec le message `The attack bonus of <nom de l'arme> cannot be negative.` (par exemple `The attack bonus of Excalibur cannot be negative.`).

**Méthodes**

| Méthode              | Visibilité | Particularité | Ce qu'elle fait                                                                |
| -------------------- | ---------- | ------------- | ------------------------------------------------------------------------------ |
| `describe(): string` | public     |               | Retourne la description de l'arme, par exemple `Excalibur (sword, +8 attack)`. |

3. Lancer la commande `npm run test:weapon` et vérifier que tous les tests passent.

---

## Exercice 2 : La classe abstraite `Character` (8 points)

### Objectif

Regrouper dans une **classe abstraite** ce qui est commun à tous les personnages.

Tous les personnages ont un nom, des points de vie et une défense, et peuvent tenir une arme. En revanche, le calcul de l'attaque et les armes autorisées dépendent de la sorte de personnage : il n'existe pas de règle « par défaut ».

### Instructions

1. Créer un fichier `src/Character.ts` avec une classe exportée **abstraite** `Character`, qui contient les éléments suivants.

**Attributs**

| Attribut      | Type             | Visibilité | Lecture seule | Rôle                            |
| ------------- | ---------------- | ---------- | ------------- | ------------------------------- |
| `name`        | `string`         | public     | oui           | Le nom du personnage.           |
| `maxHealth`   | `number`         | public     | oui           | Les points de vie maximum.      |
| `baseAttack`  | `number`         | public     | oui           | L'attaque de base, sans arme.   |
| `baseDefense` | `number`         | public     | oui           | La défense du personnage.       |
| `_health`     | `number`         | privé      | non           | Les points de vie actuels.      |
| `_weapon`     | `Weapon \| null` | privé      | non           | L'arme tenue, `null` au départ. |

**Constructeur**

Le constructeur a pour signature `public constructor(name: string, health: number, baseAttack: number, baseDefense: number)` et initialise `maxHealth` et `_health` avec `health`. Si `health` n'est pas strictement positif, il lève une erreur avec le message `The health of <nom du personnage> must be strictly positive.` (par exemple `The health of Borin must be strictly positive.`).

**Méthodes**

| Méthode                                    | Visibilité | Particularité | Ce qu'elle fait                                                                                                                                                                                                                                                         |
| ------------------------------------------ | ---------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get health(): number`                     | public     | getter        | Retourne les points de vie actuels.                                                                                                                                                                                                                                     |
| `getAttack(): number`                      | public     | **abstraite** | Retournera l'attaque du personnage, arme comprise.                                                                                                                                                                                                                      |
| `canEquip(weapon: Weapon): boolean`        | public     | **abstraite** | Retournera `true` si le personnage a le droit de tenir cette arme.                                                                                                                                                                                                      |
| `getWeaponAttackBonus(): number`           | protégé    |               | Retourne le bonus d'attaque de l'arme tenue, ou `0` sans arme.                                                                                                                                                                                                          |
| `isAlive(): boolean`                       | public     |               | Retourne `true` si les points de vie sont strictement positifs.                                                                                                                                                                                                         |
| `describe(): string`                       | public     |               | Retourne la description du personnage, par exemple `Borin - health 120/120 - attack 28 - defense 6 - weapon: Battle Axe` (ou `weapon: none` sans arme).                                                                                                                 |
| `equip(weapon: Weapon): void`              | public     |               | Fait tenir l'arme au personnage : elle remplace l'éventuelle arme précédente. Si le personnage n'a pas le droit de tenir l'arme, lève une erreur avec le message `<nom du personnage> cannot equip <nom de l'arme>.` (par exemple `Borin cannot equip Staff of Fire.`). |
| `takeDamage(amount: number): void`         | public     |               | Retire `amount` points de vie, sans descendre sous `0`.                                                                                                                                                                                                                 |
| `heal(amount: number): void`               | public     |               | Ajoute `amount` points de vie, sans dépasser `maxHealth`.                                                                                                                                                                                                               |
| `computeDamage(target: Character): number` | protégé    |               | Retourne les dégâts infligés à `target` : l'attaque du personnage moins `baseDefense` de la cible, sans descendre sous `0`.                                                                                                                                             |
| `attack(target: Character): number`        | public     |               | Frappe `target` et retourne les dégâts infligés, en suivant ces étapes dans l'ordre :<br>- Si le personnage est KO, lève une erreur avec le message `<nom du personnage> is KO and cannot attack.`<br>- Si `target` est le personnage lui-même, lève une erreur avec le message `<nom du personnage> cannot attack themselves.`<br>- Si `target` est KO, lève une erreur avec le message `<nom de la cible> is already KO.`<br>- Calcule les dégâts avec `computeDamage`, puis les inflige à `target`.<br>- Affiche avec `console.log` le message `<nom du personnage> hits <nom de la cible> for <dégâts> damage (<nom de la cible>: <vie de la cible>/<vie maximum de la cible>).` (par exemple `Borin hits Aria for 5 damage (Aria: 95/100).`).<br>- Si `target` est KO après l'attaque, affiche le message `<nom de la cible> is KO!` (par exemple `Aria is KO!`).<br>- Retourne les dégâts infligés. |

2. Lancer la commande `npm run test:character` et vérifier que tous les tests passent.

---

## Exercice 3 : Les classes `Warrior` et `Wizard` (7 points)

### Objectif

Créer deux classes enfants de `Character` par **héritage**, et **redéfinir** leurs méthodes.

### Instructions

1. Créer un fichier `src/Warrior.ts` avec une classe exportée `Warrior` qui hérite de `Character`.

**Attributs**

| Attribut          | Type     | Visibilité | Lecture seule | Statique | Valeur / rôle                                            |
| ----------------- | -------- | ---------- | ------------- | -------- | -------------------------------------------------------- |
| `RAGE_MULTIPLIER` | `number` | public     | oui           | oui      | `1.5` : le multiplicateur d'attaque du guerrier en rage. |

**Constructeur**

Le constructeur a pour signature `public constructor(name: string, health: number, baseAttack: number, baseDefense: number)`.

**Méthodes**

| Méthode                             | Visibilité | Particularité                                  | Ce qu'elle fait                                                                                                                                                       |
| ----------------------------------- | ---------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isEnraged(): boolean`              | public     |                                                | Retourne `true` si le guerrier a **moins de la moitié de sa vie maximum**.                                                                                            |
| `getAttack(): number`               | public     | redéfinie                                      | Retourne `baseAttack` plus le bonus d'attaque de l'arme. **En rage**, ce résultat est multiplié par `RAGE_MULTIPLIER` et arrondi à l'entier inférieur (`Math.floor`). |
| `canEquip(weapon: Weapon): boolean` | public     | redéfinie                                      | Un guerrier ne peut **jamais** tenir de `staff`. Toutes les autres armes sont autorisées.                                                                             |
| `describe(): string`                | public     | redéfinie, réutilise la version de `Character` | Retourne `[Warrior] Borin - health 120/120 - attack 28 - defense 6 - weapon: Battle Axe`, suivi de ` - enraged` si le guerrier est en rage.                           |

2. Lancer la commande `npm run test:warrior` et vérifier que tous les tests passent.

3. Créer un fichier `src/Wizard.ts` avec une classe exportée `Wizard` qui hérite de `Character`.

**Attributs**

| Attribut     | Type     | Visibilité | Lecture seule | Statique | Valeur / rôle                      |
| ------------ | -------- | ---------- | ------------- | -------- | ---------------------------------- |
| `SPELL_COST` | `number` | public     | oui           | oui      | `10` : le coût d'un sort, en mana. |
| `maxMana`    | `number` | public     | oui           | non      | Le mana maximum.                   |
| `_mana`      | `number` | privé      | non           | non      | Le mana actuel.                    |

**Constructeur**

Le constructeur a pour signature `public constructor(name: string, health: number, baseAttack: number, baseDefense: number, mana: number)` et initialise `maxMana` et `_mana` avec `mana`. Si `mana` est négatif, il lève une erreur avec le message `The mana of <nom du personnage> cannot be negative.` (par exemple `The mana of Merlin cannot be negative.`).

**Méthodes**

| Méthode                             | Visibilité | Particularité                                  | Ce qu'elle fait                                                                                                                                                                                                                                                |
| ----------------------------------- | ---------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get mana(): number`                | public     | getter                                         | Retourne le mana actuel.                                                                                                                                                                                                                                       |
| `set mana(value: number)`           | public     | setter                                         | Modifie le mana actuel. Si la valeur n'est pas comprise entre `0` et `maxMana`, lève une erreur avec le message `The mana of <nom du personnage> must be between 0 and <mana maximum>.` (par exemple `The mana of Merlin must be between 0 and 50.`).                            |
| `canCastSpell(): boolean`           | public     |                                                | Retourne `true` si le sorcier a au moins `SPELL_COST` points de mana.                                                                                                                                                                                          |
| `getAttack(): number`               | public     | redéfinie                                      | Retourne `baseAttack` plus le bonus d'attaque de l'arme.                                                                                                                                                                                                       |
| `canEquip(weapon: Weapon): boolean` | public     | redéfinie                                      | Retourne `true` uniquement pour `staff` et `dagger`.                                                                                                                                                                                                           |
| `describe(): string`                | public     | redéfinie, réutilise la version de `Character` | Retourne `[Wizard] Merlin - health 70/70 - attack 34 - defense 2 - weapon: Staff of Fire - mana 50/50`.                                                                                                                                                        |
| `attack(target: Character): number` | public     | redéfinie, réutilise la version de `Character` | Attaque la cible comme un personnage normal. Ensuite, **seulement s'il peut lancer un sort**, il se soigne de 20 % des dégâts infligés (arrondis à l'entier inférieur avec `Math.floor`), puis perd `SPELL_COST` points de mana. Retourne les dégâts infligés. |

4. Lancer la commande `npm run test:wizard` et vérifier que tous les tests passent.
