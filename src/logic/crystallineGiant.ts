export type Ability =
  | 'flying'
  | 'first strike'
  | 'deathtouch'
  | 'hexproof'
  | 'lifelink'
  | 'menace'
  | 'reach'
  | 'trample'
  | 'vigilance'
  | '+1/+1';

export type Abilities = Ability[];

export const AbilityValues: { [key in Ability]: Ability } = {
  flying: 'flying',
  'first strike': 'first strike',
  '+1/+1': '+1/+1',
  deathtouch: 'deathtouch',
  hexproof: 'hexproof',
  lifelink: 'lifelink',
  menace: 'menace',
  reach: 'reach',
  trample: 'trample',
  vigilance: 'vigilance'
};

export const AllAbilities: Abilities = [
  AbilityValues.flying,
  AbilityValues['first strike'],
  AbilityValues.deathtouch,
  AbilityValues.hexproof,
  AbilityValues.lifelink,
  AbilityValues.menace,
  AbilityValues.reach,
  AbilityValues.trample,
  AbilityValues.vigilance,
  AbilityValues['+1/+1']
];

interface AbilityPicker {
  (abilities: Abilities): Ability;
}

interface CrystallineGiantOptions {
  picker?: AbilityPicker;
  initialAbility?: Ability;
}

export function Pick(abilities: Abilities): Ability {
  if (abilities.length < 1) {
    throw new Error('Cannot pick from empty array.');
  }

  const nextAbilityIndex = Math.floor(Math.random() * abilities.length);

  return abilities[nextAbilityIndex];
}

export class CrystallineGiant {
  private pick: AbilityPicker;
  private ungainedAbilities: Abilities = AllAbilities;
  private abilities: Abilities = [];

  constructor({ picker = Pick, initialAbility }: CrystallineGiantOptions = {}) {
    this.pick = picker;

    if (initialAbility) {
      this.removeUngainedAbility(initialAbility);
      this.abilities = [initialAbility];
    } else {
      this.abilities = [];
      this.gainAbility();
    }
  }

  get Abilities(): Abilities {
    return [...this.abilities];
  }

  get CanGainAbility(): boolean {
    return this.ungainedAbilities.length > 0;
  }

  gainAbility = () => {
    if (!this.CanGainAbility) {
      return;
    }

    const newAbility = this.pick(this.ungainedAbilities);
    this.removeUngainedAbility(newAbility);
    this.abilities.push(newAbility);
  };

  private removeUngainedAbility(newAbility: string) {
    this.ungainedAbilities = this.ungainedAbilities.filter(
      (ability) => ability !== newAbility
    );
  }
}
