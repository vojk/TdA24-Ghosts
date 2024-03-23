import React, { useEffect, useState } from 'react'

export function AdminPanelSettings() {
  const beginUrl = 'http://grf-4f82aad588e7b46f.app.tourdeapp.cz/'

  const [data, setData] = useState(null);

  const Ja = ({ activityData }) => { 
    return (
      <div>
        {activityData ? (
          <div className='rounded-sm'>
            <h1>{activityData.activityName}</h1>
            <p>Description: {activityData.description}</p>
            <h2>Objectives:</h2>
            <ul>
              {activityData.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
            <p>Class Structure: {activityData.classStructure}</p>
            <p>Length: {activityData.lengthMin} - {activityData.lengthMax}</p>
            <p>Educational Level: {activityData.edLevel.join(', ')}</p>
            <h2>Tools:</h2>
            <ul>
              {activityData.tools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
            <h2>Home Preparation:</h2>
            <ul>
              {activityData.homePreparation.map((prep, index) => (
                <li key={index}>
                  <strong>{prep.title}</strong>
                  <p>{prep.warn}</p>
                  <p>{prep.note}</p>
                </li>
              ))}
            </ul>
            <h2>Instructions:</h2>
            <ul>
              {activityData.instructions.map((instruction, index) => (
                <li key={index}>
                  <strong>{instruction.title}</strong>
                  <p>{instruction.warn}</p>
                  <p>{instruction.note}</p>
                </li>
              ))}
            </ul>
            <h2>Agenda:</h2>
            <ul>
              {activityData.agenda.map((agendaItem, index) => (
                <li key={index}>
                  <strong>{agendaItem.title}</strong>
                  <p>Duration: {agendaItem.duration} minutes</p>
                  <p>Description: {agendaItem.description}</p>
                </li>
              ))}
            </ul>
            <h2>Links:</h2>
            <ul>
              {activityData.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul>
            <h2>Gallery:</h2>
            <ul>
              {activityData.gallery.map((galleryItem, index) => (
                <li key={index}>
                  <strong>{galleryItem.title}</strong>
                  <ul>
                    {galleryItem.images.map((image, i) => (
                      <li key={i}>
                        <img src={image.lowRes} alt="Thumbnail" />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('beginUrl/api');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <>
      <div>
        <Ja activityData={data}/>
      </div>
    </>
  )
}