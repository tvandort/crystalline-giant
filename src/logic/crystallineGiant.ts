import { hasUncaughtExceptionCaptureCallback } from 'process';
import { textChangeRangeIsUnchanged } from 'typescript';

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
  initialAbility?: Ability;
}

export function Pick(abilities: Abilities): Ability {
  if (abilities.length < 1) {
    throw new Error('Cannot pick from empty array.');
  }

  const nextAbilityIndex = Math.floor(Math.random() * abilities.length);

  return abilities[nextAbilityIndex];
}

interface CrystallineGiantState {
  ungained: Abilities;
  gained: Abilities;
}

export function CrystallineGiantReducer(
  state: CrystallineGiantState,
  action?: 'GAIN_ABILITY' | 'RESET'
): CrystallineGiantState {
  switch (action) {
    case 'GAIN_ABILITY': {
      const newAbility = Pick(state.ungained);
      return {
        gained: [...state.gained, newAbility],
        ungained: [
          ...state.ungained.filter((ability) => ability !== newAbility)
        ]
      };
    }
    case 'RESET': {
      return CrystallineGiantInitializer();
    }
    default: {
      return state;
    }
  }
}

export function CrystallineGiantInitializer(initialAbility?: Ability) {
  initialAbility = initialAbility ?? Pick(AllAbilities);
  return CrystallineGiantReducer({
    gained: [initialAbility],
    ungained: AllAbilities.filter((ability) => ability !== initialAbility)
  });
}

export class CrystallineGiant {
  private state: CrystallineGiantState;

  constructor({ initialAbility }: CrystallineGiantOptions = {}) {
    this.state = CrystallineGiantInitializer(initialAbility);
  }

  get Abilities(): Abilities {
    return this.state.gained;
  }

  get CanGainAbility(): boolean {
    return this.state.ungained.length > 0;
  }

  gainAbility = () => {
    if (!this.CanGainAbility) {
      return;
    }

    this.state = CrystallineGiantReducer(this.state, 'GAIN_ABILITY');
  };

  reset = () => {
    this.state = CrystallineGiantReducer(this.state, 'RESET');
  };
}
