import React, { useState } from 'react';
import * as xml2js from 'xml-js';

const XmlToJsonConverter: React.FC = () => {
  const [xmlInput, setXmlInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');

  const handleXmlInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setXmlInput(event.target.value);
  };

  const convertXmlToJson = (): void => {
    try {
      const result: string = xml2js.xml2json(xmlInput, { compact: true, spaces: 4 });
      setJsonOutput(result);
    } catch (error) {
      if (error instanceof Error) {
        setJsonOutput('Error converting XML to JSON: ' + error.message);
      }
    }
  };

  return (
    <div>
      <h2>XML to JSON Converter</h2>
      <textarea
        value={xmlInput}
        onChange={handleXmlInputChange}
        placeholder="Enter XML here"
        rows={10}
        cols={50}
      ></textarea>
      <br />
      <button onClick={convertXmlToJson}>Convert</button>
      <br />
      <textarea
        value={jsonOutput}
        readOnly
        placeholder="JSON result"
        rows={10}
        cols={50}
      ></textarea>
    </div>
  );
};

export default XmlToJsonConverter;
