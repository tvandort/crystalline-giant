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
  canGainAbility: boolean;
}

export function CrystallineGiantReducer(
  state: CrystallineGiantState,
  action: 'GAIN_ABILITY' | 'RESET' | 'INITIALIZE'
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
    case 'INITIALIZE': {
      return state;
    }
    default: {
      return state;
    }
  }
}

export function CrystallineGiantInitializer(initialAbility?: Ability) {
  initialAbility = initialAbility ?? Pick(AllAbilities);
  return CrystallineGiantReducer(
    {
      gained: [initialAbility],
      ungained: AllAbilities.filter((ability) => ability !== initialAbility),
      canGainAbility: true
    },
    'INITIALIZE'
  );
}

export class CrystallineGiantWrapper {
  private state: CrystallineGiantState;
  private dispatch: Dispatch<'GAIN_ABILITY' | 'RESET' | 'INITIALIZE'>;

  constructor(
    state: CrystallineGiantState,
    dispatch: Dispatch<'GAIN_ABILITY' | 'RESET' | 'INITIALIZE'>
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
    this.state = CrystallineGiantReducer(this.state, 'GAIN_ABILITY');
  };

  reset = () => {
    this.state = CrystallineGiantReducer(this.state, 'RESET');
  };
}
