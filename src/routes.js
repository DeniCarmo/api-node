import { Router } from "express";
import { deletePerson, insertPerson, selectPeople, selectPerson, updatePerson } from "./controller/Person.js";

const router = Router();

router.get('/', (req, res) => {
  res.json({
    "code": 200,
    "msg": "API is running"
  })
});

router.get('/people', selectPeople);

router.get('/person', selectPerson);
router.delete('/person', deletePerson);
router.post('/person', insertPerson);
router.put('/person', updatePerson);

export default router;