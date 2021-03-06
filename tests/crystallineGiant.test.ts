import {
  Abilities,
  Ability,
  AbilityValues,
  AllAbilities,
  CrystallineGiant,
  CrystallineGiantMessages,
  CrystallineGiantInitializer,
  CrystallineGiantReducer,
  Pick,
  CrystallineGiantState
} from '@app/logic/crystallineGiant';

const getCard = () => new CrystallineGiantTester();

describe('crystalline giant', () => {
  test('giant does not start with any abilities', () => {
    const card = getCard();

    expect(card.Abilities.length).toEqual(0);
  });

  test('giant can gain a new ability', () => {
    const card = getCard();
    const originalCount = card.Abilities.length;

    card.rollAbility();

    expect(card.Abilities.length).toEqual(originalCount + 1);
  });

  test('giant cannot gain more than 10 abilities', () => {
    const card = getCard();
    for (var index = 0; index < 11; index++) {
      card.rollAbility();
    }

    expect(card.Abilities.length).toEqual(AllAbilities.length);
  });

  test('ability array recreated every time for react', () => {
    const card = getCard();
    const originalCopyOfAbilities = card.Abilities;

    card.rollAbility();

    const newCopyOfAbilities = card.Abilities;

    expect(newCopyOfAbilities).not.toBe(originalCopyOfAbilities);
  });

  test('giant knows it cannot gain abilities', () => {
    const card = getCard();
    expect(card.CanGainAbility).toEqual(true);

    for (var index = 0; index < 11; index++) {
      card.rollAbility();
    }

    expect(card.CanGainAbility).toEqual(false);
  });

  test('giant can be reset', () => {
    const card = getCard();
    expect(card.CanGainAbility).toEqual(true);

    for (var index = 0; index < 11; index++) {
      card.rollAbility();
    }

    expect(card.CanGainAbility).toEqual(false);

    card.reset();

    expect(card.Abilities.length).toBe(0);
  });

  test('history recording', () => {
    const card = getCard();

    card.addAbility('+1/+1');

    expect(card.History[0]).toEqual({
      gained: [],
      history: [],
      ungained: [
        'flying',
        'first strike',
        'deathtouch',
        'hexproof',
        'lifelink',
        'menace',
        'reach',
        'trample',
        'vigilance',
        '+1/+1'
      ]
    });
  });

  test('undo', () => {
    const card = getCard();

    card.addAbility('+1/+1');
    card.rollAbility();

    card.undo();

    expect(card.Abilities).toEqual(['+1/+1']);
  });
});

describe('randomizer', () => {
  test('picker returns a value', () => {
    const firstStrike = AbilityValues['first strike'];

    const abilities: Abilities = [firstStrike];

    expect(Pick(abilities)).toEqual(firstStrike);
  });

  test.each(AllAbilities)(
    'picker returns %p some of the time',
    (ability: Ability) => {
      const results = {
        flying: 0,
        'first strike': 0,
        '+1/+1': 0,
        deathtouch: 0,
        hexproof: 0,
        lifelink: 0,
        menace: 0,
        reach: 0,
        trample: 0,
        vigilance: 0
      };

      const attemptsUntilWeShouldHaveAbility = 100;
      for (var index = 0; index < attemptsUntilWeShouldHaveAbility; index++) {
        const ability = Pick(AllAbilities);
        results[ability] = results[ability] + 1;
      }

      expect(results[ability]).toBeGreaterThan(0);
    }
  );
});

class CrystallineGiantTester {
  private wrapper: CrystallineGiant;

  constructor() {
    let state = CrystallineGiantInitializer();

    const dispatch = (action: CrystallineGiantMessages) => {
      state = CrystallineGiantReducer(state, action);
      this.wrapper = new CrystallineGiant(state, dispatch);
    };

    this.wrapper = new CrystallineGiant(state, dispatch);
  }

  get Abilities(): Abilities {
    return this.wrapper.Abilities;
  }

  get CanGainAbility(): boolean {
    return this.wrapper.CanGainAbility;
  }

  get History(): CrystallineGiantState[] {
    return this.wrapper.History;
  }

  rollAbility = () => {
    this.wrapper.rollAbility();
  };

  reset = () => {
    this.wrapper.reset();
  };

  addAbility = (ability: Ability) => {
    this.wrapper.addAbility(ability);
  };

  undo = () => {
    this.wrapper.undo();
  };
}
