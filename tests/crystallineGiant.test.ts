import {
  Abilities,
  Ability,
  AbilityValues,
  AllAbilities,
  CrystallineGiant,
  Pick
} from '@app/logic/crystallineGiant';

describe(CrystallineGiant, () => {
  test('giant starts with an ability', () => {
    const card = new CrystallineGiant();

    expect(card.Abilities.length).toEqual(1);
    expect(AllAbilities).toContain(card.Abilities[0]);
  });

  test('giant can gain a new ability', () => {
    const card = new CrystallineGiant();

    card.gainAbility();

    expect(card.Abilities.length).toEqual(2);
  });

  test('giant cannot gain more than 10 abilities', () => {
    const card = new CrystallineGiant();

    for (var index = 0; index < 11; index++) {
      card.gainAbility();
    }

    expect(card.Abilities.length).toEqual(10);
  });

  test('giant knows it cannot gain abilities', () => {
    const card = new CrystallineGiant();

    expect(card.CanGainAbility).toEqual(true);

    for (var index = 0; index < 11; index++) {
      card.gainAbility();
    }

    expect(card.CanGainAbility).toEqual(false);
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
