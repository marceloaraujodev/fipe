import { useState, useEffect } from 'react';

export default function CenterHero() {
  const [make, setMake] = useState('Make');
  const [model, setModel] = useState('Model');
  const [year, setYear] = useState('Year');

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState({ modelos: [], anos: [] });
  const [years, setYears] = useState();

  const [makeId, setMakeId] = useState();
  const [modelId, setModelId] = useState();
  const [yearId, setYearId] = useState();

  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);

  /* First .then:
    fetch returns a Promise that resolves to the Response object representing the completion or failure of the request.
    The first .then is used to convert the raw response data (which might be in JSON, text, or other formats) into a JavaScript object using the res.json() method.
    This method returns another Promise that resolves to the actual data parsed from the JSON response.
    Second .then:

    The second .then is used to handle the parsed data (JavaScript object) that is obtained from the first .then.
    This is where you can access and use the data retrieved from the API in your application logic.  
*/

// REFACTORE CODE!


  useEffect(() => {
    fetchMakes();
  }, []); 

  useEffect(() => {
    if(makeId){
      fetchModels();
    }
  }, [makeId]);

  useEffect(() => {
    if(modelId){
      fetchYears();
    }
  }, [modelId])

  useEffect(() => {
    if(yearId){
      fetchPrice();
    }
  }, [yearId])

  useEffect(() => {

  }, [price]) 

  function fetchMakes() {
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/')
      .then((res) => res.json())
      .then((data) => {
        setMakes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Error fetching makes`, error)
        setLoading(false);
      });
  }

  function fetchModels() {
    fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${makeId}/modelos`
    )
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Error fetching makes`, error)
        setLoading(false);
      });
  }

  function fetchYears() {
    fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${makeId}/modelos/${modelId}/anos/`
    )
      .then((res) => res.json())
      .then((data) => {
        setYears(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching Years', error);
        setLoading(false);
      });
  }

  function fetchPrice(){
    fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${makeId}/modelos/${modelId}/anos/${yearId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setPrice(data.Valor);
          setLoading(false)
        })
        .catch((error) => {
          console.log('Error fetching Years', error);
          setLoading(false);
        });
  }

  function handleMakeChange(e) {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const dataId = selectedOption.dataset.id;

    setModel('Model');
    setYear('Year');

    setMake(e.target.value);
    setMakeId(dataId);
  }

  function handleModelChange(e) {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const modelCodigo = selectedOption.dataset.id;

    
    setYear('Year')

    setModelId(modelCodigo);
    setModel(e.target.value);
  }

  function handleYearChange(e) {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const yearCodigo = selectedOption.dataset.id;

    setYearId(yearCodigo);
    setYear(e.target.value)
    
  }

  return (
    <>
    
      <div className="px-4 py-5 text-center">
        {/* ... */}
        <h1 className="display-5 mt-5 fw-bold text-body-emphasis">
          Fipe Car Prices
        </h1>
        <p>A fast App for checking car prices in Brazil.</p>

        <div className="container text-center mt-5">
          <div className="row">
          
            {/* Brands - Make */}
            <div className="col m-0 p-0">
              <select
                className="form-select rounded-0"
                aria-label="Default select example"
                value={make}
                onChange={handleMakeChange}
              >
                <option disabled defaultValue={'Make'}>
                  {make}
                </option>
                {makes.map((makeOps) => (
                  <option
                    key={makeOps.codigo}
                    value={makeOps.nome}
                    data-id={makeOps.codigo}
                  >
                    {makeOps.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Models */}
            <div className="col m-0 p-0">
              <select
                className="form-select rounded-0"
                aria-label="Default select example"
                value={model}
                onChange={handleModelChange}
                disabled={loading || !makeId}
              >
                <option disabled defaultValue={'Model'}>
                  {model}
                </option>

                {makeId
                  ? models.modelos.map((modelsOps) => (
                      <option
                        key={modelsOps.codigo}
                        value={modelsOps.nome}
                        data-id={modelsOps.codigo}
                      >
                        {modelsOps.nome}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            {/* Years */}
            <div className="col m-0 p-0">
              <select
                className="form-select rounded-0"
                aria-label="Default select example"
                value={year}
                onChange={handleYearChange}
                disabled={loading || !modelId}
              >
                <option disabled defaultValue={'Year'}>
                  {year}
                </option>
                {years
                  ? years.map((anosOps) => (
                      <option
                        key={anosOps.codigo}
                        value={anosOps.nome}
                        data-id={anosOps.codigo}
                      >
                        {anosOps.nome}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <h1 className="mt-5"> {price ? ` ${price}` : null}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

/* Notes
Selecting items from a <options></options> element

In a select element, the onChange event is triggered on the select element itself, not on its individual option elements.

e.target.options gives you an array with your options and the last item is the selectedIndex of the item selected from the <options></options> element You can use the selected index to pick and choose things in react

with that you can choose the item you want like this:

const selectindex = e.target.selectedIndex;
const selectedOption = e.target.options[selectedindex];
const selectedItemId = selecteOption.dataset.id 

html structure in react is <option value={makeOps.nome} data-id={makeOps.codigo}>

*/
