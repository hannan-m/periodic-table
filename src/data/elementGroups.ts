import { ElementGroup, ElementGroupInfo } from '../types/periodic-table';

const elementGroups: Record<ElementGroup, ElementGroupInfo> = {
  'alkali-metal': {
    color: 'bg-red-700 dark:bg-red-900 text-white',
    name: 'Alkali Metals',
    description:
      'Highly reactive metals that readily lose their outermost electron to form positively charged ions.',
  },
  'alkaline-earth': {
    color: 'bg-orange-700 dark:bg-orange-900 text-white',
    name: 'Alkaline Earth Metals',
    description:
      'Reactive metals that form compounds with a +2 oxidation state.',
  },
  'transition-metal': {
    color: 'bg-amber-600 dark:bg-amber-800 text-white',
    name: 'Transition Metals',
    description:
      'Metals that form colored compounds and can have multiple oxidation states.',
  },
  'post-transition-metal': {
    color: 'bg-teal-700 dark:bg-teal-900 text-white',
    name: 'Post-Transition Metals',
    description:
      'Metals with poor mechanical properties, located between transition metals and metalloids.',
  },
  metalloid: {
    color: 'bg-emerald-700 dark:bg-emerald-900 text-white',
    name: 'Metalloids',
    description: 'Elements with properties of both metals and nonmetals.',
  },
  nonmetal: {
    color: 'bg-blue-700 dark:bg-blue-900 text-white',
    name: 'Nonmetals',
    description: 'Elements that are poor conductors of heat and electricity.',
  },
  halogen: {
    color: 'bg-indigo-700 dark:bg-indigo-900 text-white',
    name: 'Halogens',
    description:
      'Highly reactive nonmetals that readily gain electrons to form negative ions.',
  },
  'noble-gas': {
    color: 'bg-purple-700 dark:bg-purple-900 text-white',
    name: 'Noble Gases',
    description:
      'Extremely unreactive elements due to their full valence electron shells.',
  },
  lanthanide: {
    color: 'bg-fuchsia-700 dark:bg-fuchsia-900 text-white',
    name: 'Lanthanides',
    description:
      'Rare earth elements with similar properties, part of the inner transition series.',
  },
  actinide: {
    color: 'bg-pink-700 dark:bg-pink-900 text-white',
    name: 'Actinides',
    description:
      'Radioactive elements, mostly synthetic, part of the inner transition series.',
  },
};

export default elementGroups;
