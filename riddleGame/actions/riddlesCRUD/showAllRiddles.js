import { getAllRiddles } from '../../api/riddlesApi.js';

export async function showAllRiddles() {
  try {
    const riddles = await getAllRiddles();
    if (!riddles.length) {
      console.log('\nNo riddles found.');
      return;
    }
    console.log('\n--- All Riddles ---');
    riddles.forEach((r, index) => {
      console.log(`${index + 1}. [${r._id}] ${r.name}`);
    });
  } catch (err) {
    console.error('Failed to load riddles:', err.message);
  }
}
