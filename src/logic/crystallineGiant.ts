import { Dispatch } from 'react';

const Flying = 'flying';
const FirstStrike = 'first strike';
const Deathtouch = 'deathtouch';
const Hexproof = 'hexproof';
const Lifelink = 'lifelink';
const Menace = 'menace';
const Reach = 'reach';
const Trample = 'trample';
const Vigilance = 'vigilance';
const PlusOnePlusOne = '+1/+1';

export type Ability =
  | typeof Flying
  | typeof FirstStrike
  | typeof Deathtouch
  | typeof Hexproof
  | typeof Lifelink
  | typeof Menace
  | typeof Reach
  | typeof Trample
  | typeof Vigilance
  | typeof PlusOnePlusOne;

export type Abilities = Ability[];

export const AbilityValues: { [key in Ability]: Ability } = {
  [Flying]: Flying,
  [FirstStrike]: FirstStrike,
  [PlusOnePlusOne]: PlusOnePlusOne,
  [Deathtouch]: Deathtouch,
  [Hexproof]: Hexproof,
  [Lifelink]: Lifelink,
  [Menace]: Menace,
  [Reach]: Reach,
  [Trample]: Trample,
  [Vigilance]: Vigilance
};

export const AllAbilities: Abilities = [
  AbilityValues.flying,
  AbilityValues[FirstStrike],
  AbilityValues.deathtouch,
  AbilityValues.hexproof,
  AbilityValues.lifelink,
  AbilityValues.menace,
  AbilityValues.reach,
  AbilityValues.trample,
  AbilityValues.vigilance,
  AbilityValues[PlusOnePlusOne]
];

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
  canGainAbility: boolean;
}

export function CrystallineGiantReducer(
  state: CrystallineGiantState,
  action: CrystallineGiantActions
): CrystallineGiantState {
  const CanGainAbility = (abilities: Abilities) => {
    return abilities.length > 0;
  };

  switch (action) {
    case 'GAIN_ABILITY': {
      if (!CanGainAbility(state.ungained)) {
        return state;
      }

      const newAbility = Pick(state.ungained);
      const ungained = state.ungained.filter(
        (ability) => ability !== newAbility
      );
      return {
        gained: [...state.gained, newAbility],
        ungained,
        canGainAbility: CanGainAbility(ungained)
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

export function CrystallineGiantInitializer(): CrystallineGiantState {
  return {
    gained: [],
    ungained: AllAbilities,
    canGainAbility: true
  };
}

export type CrystallineGiantActions = 'GAIN_ABILITY' | 'RESET';

export class CrystallineGiant {
  private state: CrystallineGiantState;
  private dispatch: Dispatch<CrystallineGiantActions>;

  constructor(
    state: CrystallineGiantState,
    dispatch: Dispatch<CrystallineGiantActions>
  ) {
    this.state = state;
    this.dispatch = dispatch;
  }

  get Abilities(): Abilities {
    return this.state.gained;
  }

  get CanGainAbility(): boolean {
    return this.state.ungained.length > 0;
  }

  gainAbility = () => {
    this.dispatch('GAIN_ABILITY');
  };

  reset = () => {
    this.dispatch('RESET');
  };
}
