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

export interface CrystallineGiantState {
  ungained: Abilities;
  gained: Abilities;
  history: CrystallineGiantState[];
}

export function CrystallineGiantReducer(
  state: CrystallineGiantState,
  message: CrystallineGiantMessages
): CrystallineGiantState {
  const CanGainAbility = (abilities: Abilities) => {
    return abilities.length > 0;
  };

  switch (message.action) {
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
        history: [state, ...state.history]
      };
    }
    case 'RESET': {
      return CrystallineGiantInitializer();
    }
    case 'ADD_ABILITY': {
      const ungained = state.ungained.filter(
        (ability) => ability !== message.ability
      );
      return {
        gained: [...state.gained, message.ability],
        ungained,
        history: [state, ...state.history]
      };
    }
    case 'UNDO': {
      if (state.history.length < 1) {
        return state;
      }
      const { gained, ungained, history } = state.history[0];

      return {
        gained,
        ungained,
        history
      };
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
    history: []
  };
}

export type CrystallineGiantMessages =
  | { action: 'GAIN_ABILITY' }
  | { action: 'RESET' }
  | { action: 'ADD_ABILITY'; ability: Ability }
  | { action: 'UNDO' };

export class CrystallineGiant {
  private state: CrystallineGiantState;
  private dispatch: Dispatch<CrystallineGiantMessages>;

  constructor(
    state: CrystallineGiantState,
    dispatch: Dispatch<CrystallineGiantMessages>
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

  get UngainedAbilities(): Abilities {
    return this.state.ungained;
  }

  get History(): CrystallineGiantState[] {
    return this.state.history;
  }

  get CanUndo(): boolean {
    return this.state.history.length > 0;
  }

  rollAbility = () => {
    this.dispatch({ action: 'GAIN_ABILITY' });
  };

  reset = () => {
    this.dispatch({ action: 'RESET' });
  };

  addAbility = (ability: Ability) => {
    this.dispatch({
      action: 'ADD_ABILITY',
      ability
    });
  };

  undo = () => {
    this.dispatch({ action: 'UNDO' });
  };
}
