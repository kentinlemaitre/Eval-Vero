import { Weapon } from './Weapon';


export class Character {
 

  public readonly name: string;
  public readonly maxHealth: number;
  public readonly baseAttack: number;
  public readonly baseDefense: number;
  private _health: number;
  private _weapon: Weapon | null;



public constructor(name: string, health: number, baseAttack: number, baseDefense: number){

    if (health <= 0) {
      throw new Error(`The health of ${name} must be strictly positive.`);
    }

    this.name = name;
    this._health = health;
    this.baseAttack = baseAttack;
    this.baseDefense = baseDefense;
}


public get health(): number {
    return this.health;
  }

  public set hp(value: number) {
    this._health = Math.max(0, Math.min(value, this.maxHealth));
  }

 public getAttack(): number {
    return this.baseAttack;
  }

  public get weapon(): readonly Weapon[] {
    return this._weapon;
  }

   public canEquip(weapon: Weapon): boolean {
    if (this.name == true) {
      return this._weapon.push(weapon);
    }
}


protected getWeaponAttackBonus(): number {
    if (this._weapon === 0) {
      return attackBonus;
    }

    else {
        return 0;
    }
}


 public isAlive(): boolean {
    return this._health > 0;
  }


  public describe(): string {
    return `${this.name} - health ${this._health}/${this.maxHealth} - attack ${this.baseAttack}  - defense ${this.baseDefense} - weapon: ${this._weapon}`;
  }


   public findSkill(skillName: string): Weapon {
    const skill = this._weapon.find((known) => known.name === skillName);

    if (!skill) {
      throw new Error(`${this.name} does not know ${skillName}.`);
    }

    return skill;
  }

  

  public equip(skillName: string, target: Weapon): void {
    const skill = this.findSkill(skillName);

    target.takeDamage(skill.attackBonus);
    console.log(
      `${this.name} cannot equip ${this._weapon}`
    );
  }

  public takeDamage(amount: number): void {
    this._health = this._health - amount;
  }
  
  public heal(amount: number): void {
    this._health = this._health + amount;
  }



  public computeDamage(skillName: string, target: Weapon): void {
    const skill = this.findSkill(skillName);

    target.takeDamage(skill.attackBonus);
    console.log(
      `${this.name} uses ${skill.name}! ${target.name} loses ${skill.attackBonus} HP (${this._health}/${this.maxHealth}).`
    );
  }

}
