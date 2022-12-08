//https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial/static-web-app-image-analysis?tabs=bash%2Cvscode
import React, { useState } from 'react';
import { computerVision, isConfigured as ComputerVisionIsConfigured } from './azure-cognitiveservices-computervision';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ComputerVision() {

  const [fileSelected, setFileSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setFileSelected(e.target.value) // controla a alteração do input da imagem
  }
  const sendImage = (e) => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);

    computerVision(fileSelected || null).then((item) => {
      // reset state/form
      setAnalysis(item); // defindo variável analysis com o retorno item da chamada da funcao
      setFileSelected("");
      setProcessing(false);
    });

  };

const DisplayCaption=()=>{
  return(
<div className=''>
      <h2>Marcas na imagem:</h2>
      <div className='my-5 justify-content-center '><img src={analysis.URL} height="200" border="1" alt="Imagem" /></div>

      <table className="table table-striped ">
        <tbody>
        <tr  scope="row">
              <td className='h6'>Marcas encontradas</td>
              <td className='h6'>Confiabilidade</td>
              <td className='h6'>Posição</td>
            </tr>
              {
      analysis.brands.map(function (item, index) {

        return (
          <>

            <tr key={index} scope="row">
              <td>{(item.name)}</td>
              <td>{(Math.round(item.confidence*100))+"%"}</td>
              <td>x:{(item.rectangle.x)}  y:{(item.rectangle.y)}  w:{(item.rectangle.w)}  h:{(item.rectangle.h)}</td>
            </tr>

          </>
        );

          })}
          </tbody>
          </table>


    </div>
  )
}

  const DisplayResults = () => {
    return (
      <div>
        {DisplayCaption()}

      </div>
    )
  };

  const Analyze = () => {
    return (
    <div className="container">
      <h4 className="display-2 text-center">Quais a marcas a foto contém?</h4>
      {!processing &&
        <div className="text-center">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">URL</span>
            <input class="form-control" type="text" placeholder="Entre com a URL" size="50" onChange={handleChange}></input>

          </div>
          <button className='btn btn-secondary' onClick={sendImage}>Analisar</button>
        </div>
      }
      {processing && <div>Processing</div>}
      <hr />
      {analysis && DisplayResults()}
      </div>
    )
  }

  const CantAnalyze = () => {
    return (
      <div>Key e/ou endpoint não configurado em ./azure-cognitiveservices-computervision.js</div>
    )
  }

  function Render() {
    const ready = ComputerVisionIsConfigured();
    if (ready) {
      return <Analyze />;
    }
    return <CantAnalyze />;
  }

  return (
    <div>
      {Render()}
    </div>

  );
}

export default ComputerVision;
