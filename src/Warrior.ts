import { Character } from './Character';

export class Warrior extends Character { 

    public readonly RAGE_MULTIPLIER: string;




    public isEnraged(): boolean {
    if (health <= health / 2)
    return true;
    }

    public getAttack2(): number {
        if()
        return this.baseAttack + this.RAGE_MULTIPLIER;
    }

   public canEquip(weapon: Weapon): boolean {

   }


 public describe(): string {
    return `${this.name} - health ${this._health}/${this.maxHealth} - attack ${this.baseAttack}  - defense ${this.baseDefense} - weapon: ${this._weapon}`;
  }

}