import { useEffect, useState } from "react";
import { useform } from "../../../hooks/useForm"
import { IHeroes } from "../../../types/IHeroes";
import { heroesData } from "../../../data/heroes";
import { InputGroup, Form } from "react-bootstrap";
import { CardHero } from "../../ui/CardHero/CardHero";
import styles from "./Search.module.css"

export const Search = () => {

  const { values, handleChange } = useform({
    search: ""
  })

  const { search } = values;

  const [heros, setHeros] = useState<IHeroes[]>([]);

  useEffect(() => {
    const result = heroesData.filter(
      (h) => h.superhero.toLowerCase().trim().includes(search)
    )
    setHeros(result)

  }, [search])

  return (
    <div className={styles.containerSearch}>
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Text>Ingrese Heroe</InputGroup.Text>
          <Form.Control onChange={handleChange} type="text" name="search"></Form.Control>
        </InputGroup>
      </div>
      <div className={styles.containerListHeros}>
        {
          heroesData.length > 0 ? (
            <>
              {
                heros.map((hero) => (
                  <div key={hero.id} style={{width: '80%'}}>
                    <CardHero hero={hero}/>
                  </div>
                ))
              }

            </>
          ): (
            <div>
              <h3>No coincide a busqueda</h3>
            </div>
          )
        }
      </div>
    </div>
  )
}
