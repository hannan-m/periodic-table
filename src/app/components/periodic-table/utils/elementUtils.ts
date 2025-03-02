import { Element } from '../../../../types/periodic-table';

export function getElementInfo(element: Element) {
  return {
    electronConfig: getElectronConfiguration(element.number),
    physicalState: getPhysicalState(element),
    electronegativity: getElectronegativity(element),
    shells: calculateElectronsPerShell(element.number),
    commonUses: getCommonUses(element.symbol),
    valenceElectrons: getValenceElectrons(element),
  };
}

// Function to get electron configuration
export function getElectronConfiguration(atomicNumber: number): string {
  // Simplified electron configuration
  const shells = [
    '1s',
    '2s',
    '2p',
    '3s',
    '3p',
    '4s',
    '3d',
    '4p',
    '5s',
    '4d',
    '5p',
    '6s',
    '4f',
    '5d',
    '6p',
    '7s',
    '5f',
    '6d',
    '7p',
  ];
  const maxElectrons = [
    2, 2, 6, 2, 6, 2, 10, 6, 2, 10, 6, 2, 14, 10, 6, 2, 14, 10, 6,
  ];

  const config = [];
  let electrons = atomicNumber;

  for (let i = 0; i < shells.length && electrons > 0; i++) {
    const shellElectrons = Math.min(electrons, maxElectrons[i]);
    if (shellElectrons > 0) {
      config.push(`${shells[i]}${shellElectrons}`);
    }
    electrons -= shellElectrons;
  }

  return config.join(' ');
}

// Function to calculate electrons per shell
export function calculateElectronsPerShell(atomicNumber: number): number[] {
  let electrons = atomicNumber;
  const shells: number[] = [];
  const maxElectrons = [2, 8, 18, 32, 32, 18, 8];

  for (let i = 0; i < maxElectrons.length && electrons > 0; i++) {
    const shellElectrons = Math.min(electrons, maxElectrons[i]);
    shells.push(shellElectrons);
    electrons -= shellElectrons;
  }

  return shells;
}

// Function to get physical state at room temperature
export function getPhysicalState(element: Element): string {
  const gases = ['H', 'He', 'N', 'O', 'F', 'Ne', 'Cl', 'Ar', 'Kr', 'Xe', 'Rn'];
  const liquids = ['Br', 'Hg', 'Ga'];

  if (gases.includes(element.symbol)) return 'Gas';
  if (liquids.includes(element.symbol)) return 'Liquid';
  return 'Solid';
}

// Function to get electronegativity value
export function getElectronegativity(element: Element): string {
  const values: Record<string, number> = {
    H: 2.2,
    He: 0,
    Li: 0.98,
    Be: 1.57,
    B: 2.04,
    C: 2.55,
    N: 3.04,
    O: 3.44,
    F: 3.98,
    Ne: 0,
    Na: 0.93,
    Mg: 1.31,
    Al: 1.61,
    Si: 1.9,
    P: 2.19,
    S: 2.58,
    Cl: 3.16,
    Ar: 0,
    K: 0.82,
    Ca: 1.0,
    Fe: 1.83,
    Cu: 1.9,
    Ag: 1.93,
    Au: 2.54,
    Hg: 2.0,
    Pb: 2.33,
    U: 1.38,
  };

  return values[element.symbol] ? values[element.symbol].toFixed(2) : 'N/A';
}

// Function to get valence electrons
export function getValenceElectrons(element: Element): number {
  // Simplified calculation based on group for main group elements
  if (element.column === 1 || element.column === 2) {
    return element.column;
  } else if (element.column >= 13 && element.column <= 18) {
    return element.column - 10;
  }

  // For transition metals and special cases
  const shells = calculateElectronsPerShell(element.number);

  // For noble gases
  if (element.group === 'noble-gas') {
    return 8;
  }

  // For most other elements, return the electrons in the outermost shell
  return shells[shells.length - 1];
}

// Function to get common uses for elements
export function getCommonUses(symbol: string): string {
  const uses: Record<string, string> = {
    H: "Hydrogen is used in fuel cells, petroleum refining, and ammonia production. It's also being explored as a clean energy carrier.",
    He: 'Helium is used to cool superconducting magnets in MRI machines, as a lifting gas in balloons, and in deep-sea diving gas mixtures.',
    Li: 'Lithium is essential for rechargeable batteries in electronics and electric vehicles, and is used to treat bipolar disorder.',
    Be: 'Beryllium is used in aerospace components, X-ray machines, and nuclear reactors due to its low density and high thermal conductivity.',
    B: 'Boron compounds are used in detergents, glass production, and as agricultural micronutrients.',
    C: "Carbon forms the basis of organic chemistry and life. It's used in steel production, as graphite in pencils, and as diamond in cutting tools.",
    N: 'Nitrogen is used in fertilizer production, food preservation, and as a coolant for extremely low temperatures.',
    O: "Oxygen is vital for respiration and combustion. It's used in medical treatments, steelmaking, and rocket propellants.",
    F: 'Fluorine compounds are used in toothpaste, non-stick coatings (Teflon), and refrigerants.',
    Na: 'Sodium is used in street lights, table salt (NaCl), and various chemical processes.',
    Mg: 'Magnesium is used in lightweight alloys for aerospace and automotive applications, and in fireworks and flares.',
    Al: 'Aluminum is used in aircraft construction, packaging, and electrical transmission lines due to its light weight and corrosion resistance.',
    Si: 'Silicon is essential for semiconductors in electronic devices, as well as in glass, ceramics, and concrete.',
    P: 'Phosphorus is vital for DNA, ATP (energy storage), and is used in fertilizers, detergents, and matches.',
    S: 'Sulfur is used in fertilizers, gunpowder, vulcanization of rubber, and pharmaceuticals.',
    Cl: 'Chlorine is used in water purification, PVC plastic production, and as a disinfectant.',
    Ar: 'Argon is used in welding, as a filling gas in light bulbs, and in double-glazed windows as an insulator.',
    K: "Potassium is essential for plant growth and used in fertilizers. It's also vital for nerve function in humans.",
    Ca: "Calcium is crucial for bones and teeth. It's used in cement, plaster, and as a dietary supplement.",
    Fe: "Iron is used in steel production, construction, and machinery. It's also essential for hemoglobin in blood.",
    Cu: 'Copper is used in electrical wiring, plumbing, coinage, and as an architectural material.',
    Ag: 'Silver is used in jewelry, photography, electrical contacts, and as an antimicrobial agent.',
    Au: 'Gold is used in jewelry, electronics, dentistry, and as a store of value and investment.',
    Hg: 'Mercury is used in thermometers, barometers, fluorescent lighting, and some electrical switches.',
    Pb: 'Lead is used in batteries, radiation shielding, and as a sound dampener.',
    U: 'Uranium is primarily used as fuel in nuclear power plants and in nuclear weapons.',
  };

  return (
    uses[symbol] ||
    'Applications include industrial processes, research, and various specialized uses depending on its properties.'
  );
}
