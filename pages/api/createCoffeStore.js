import { findStore, createStore } from '../../services/table';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, neighborhood, adress, imgUrl, voting } = req.body;
    const storeData = { id, name, neighborhood, adress, imgUrl, voting };
    try {
      if (!id) return res.json({ message: 'id is missing' });
      const existingStore = await findStore(id);
      if (existingStore.length !== 0) {
        const records = existingStore.map((record) => {
          return {
            ...record.fields,
          };
        });
        return res.json(records);
      } else {
        if (name && id) {
          const newStore = await createStore(storeData);
          const newStoreData = newStore.map((record) => {
            return {
              ...record.fields,
            };
          });
          console.log(newStoreData);
          return res.json(newStoreData);
        } else {
          res.status(422);
          res.json({ message: 'Id or name are missing' });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ message: 'Error finding store', e });
    }
  } else {
    res.json({ message: 'this is a post route' });
  }
};
export default createCoffeeStore;
