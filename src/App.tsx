
import { useState } from 'react';
import { parseXML, buildXML } from './utils/xmlHandler';
import SettingsEditor from './components/SettingsEditor';
import './App.css';

function App() {
  const [xmlText, setXmlText] = useState('');
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setXmlText(text);
    try {
      const parsed = parseXML(text);
      setJsonData(parsed);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Invalid XML file');
    }
  };

  const downloadXML = () => {
    if (!jsonData) return;
    const blob = new Blob([buildXML(jsonData)], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'edited-quiz.xml';
    link.click();
  };

  const addNewContentBlock = (type: string) => {
    const newItem = {
      $: { type },
      title: '',
      body: '',
      ...(type === 'choice' && { option: ['', '', ''], correct: '1' }),
    };

    setJsonData((prev: any) => ({
      ...prev,
      quizDefinition: {
        ...prev.quizDefinition,
        quiz: {
          ...prev.quizDefinition.quiz,
          content: [...prev.quizDefinition.quiz.content, newItem],
        },
      },
    }));
  };

  const handleDelete = (index: number) => {
    const updated = [...jsonData.quizDefinition.quiz.content];
    updated.splice(index, 1);
    setJsonData((prev: any) => ({
      ...prev,
      quizDefinition: {
        ...prev.quizDefinition,
        quiz: {
          ...prev.quizDefinition.quiz,
          content: updated,
        },
      },
    }));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🎯 Quiz Editor</h1>

      <input type="file" accept=".xml" onChange={handleUpload} />
      {error && <p className="error-text">{error}</p>}

      {jsonData && (
        <>
          <SettingsEditor
            settings={jsonData.quizDefinition.settings}
            onSave={(updatedSettings) =>
              setJsonData((prev: any) => ({
                ...prev,
                quizDefinition: {
                  ...prev.quizDefinition,
                  settings: updatedSettings,
                },
              }))
            }
          />

          <div className="add-block">
            <label><strong>Add New Content Type:</strong></label>
            <select
              onChange={(e) => {
                const type = e.target.value;
                if (type) {
                  addNewContentBlock(type);
                  e.target.value = '';
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>Select type</option>
              <option value="choice">Choice</option>
              <option value="number">Number</option>
              <option value="video">Video</option>
              <option value="joker">Joker</option>
              <option value="buzzer">Buzzer</option>
              <option value="round">Round</option>
              <option value="holding">Holding</option>
              <option value="scoreboard">Scoreboard</option>
            </select>
          </div>

          <h2>📋 Quiz Content</h2>
          {Array.isArray(jsonData.quizDefinition.quiz.content) &&
            jsonData.quizDefinition.quiz.content.map((item: any, index: number) => (
              <div key={index} className="quiz-card">
                <form>
                  <label>Type</label>
                  <select
                    className="input"
                    value={item['$']?.type || ''}
                    onChange={(e) => {
                      const updated = [...jsonData.quizDefinition.quiz.content];
                      updated[index].$ = { ...updated[index].$, type: e.target.value };
                      setJsonData((prev: any) => ({
                        ...prev,
                        quizDefinition: {
                          ...prev.quizDefinition,
                          quiz: {
                            ...prev.quizDefinition.quiz,
                            content: updated,
                          },
                        },
                      }));
                    }}
                  >
                    <option value="choice">Choice</option>
                    <option value="number">Number</option>
                    <option value="video">Video</option>
                    <option value="joker">Joker</option>
                    <option value="buzzer">Buzzer</option>
                    <option value="round">Round</option>
                    <option value="holding">Holding</option>
                    <option value="scoreboard">Scoreboard</option>
                  </select>

                  <label>Round</label>
                  <input className="input" type="number" value={item['$']?.round || ''} onChange={(e) => {
                    const updated = [...jsonData.quizDefinition.quiz.content];
                    updated[index].$ = { ...updated[index].$, round: e.target.value };
                    setJsonData({ ...jsonData, quizDefinition: { ...jsonData.quizDefinition, quiz: { ...jsonData.quizDefinition.quiz, content: updated } } });
                  }} />

                  <label>Question Number</label>
                  <input className="input" type="number" value={item['$']?.questionNum || ''} onChange={(e) => {
                    const updated = [...jsonData.quizDefinition.quiz.content];
                    updated[index].$ = { ...updated[index].$, questionNum: e.target.value };
                    setJsonData({ ...jsonData, quizDefinition: { ...jsonData.quizDefinition, quiz: { ...jsonData.quizDefinition.quiz, content: updated } } });
                  }} />

                  <label>Countdown Length</label>
                  <input className="input" type="number" value={item['$']?.countdownLength || ''} onChange={(e) => {
                    const updated = [...jsonData.quizDefinition.quiz.content];
                    updated[index].$ = { ...updated[index].$, countdownLength: e.target.value };
                    setJsonData({ ...jsonData, quizDefinition: { ...jsonData.quizDefinition, quiz: { ...jsonData.quizDefinition.quiz, content: updated } } });
                  }} />

                  <label>Background</label>
                  <input className="input" value={item['$']?.background || ''} onChange={(e) => {
                    const updated = [...jsonData.quizDefinition.quiz.content];
                    updated[index].$ = { ...updated[index].$, background: e.target.value };
                    setJsonData({ ...jsonData, quizDefinition: { ...jsonData.quizDefinition, quiz: { ...jsonData.quizDefinition.quiz, content: updated } } });
                  }} />

                  <label>iPad Background</label>
                  <input className="input" value={item['$']?.iPadBackground || ''} onChange={(e) => {
                    const updated = [...jsonData.quizDefinition.quiz.content];
                    updated[index].$ = { ...updated[index].$, iPadBackground: e.target.value };
                    setJsonData({ ...jsonData, quizDefinition: { ...jsonData.quizDefinition, quiz: { ...jsonData.quizDefinition.quiz, content: updated } } });
                  }} />

                  <label>Web Background</label>
                  <input className="input" value={item['$']?.webBackground || ''} onChange={(e) => {
                    const updated = [...jsonData.quizDefinition.quiz.content];
                    updated[index].$ = { ...updated[index].$, webBackground: e.target.value };
                    setJsonData({ ...jsonData, quizDefinition: { ...jsonData.quizDefinition, quiz: { ...jsonData.quizDefinition.quiz, content: updated } } });
                  }} />

                  <label>Title</label>
                  <input className="input" value={item.title || ''} onChange={(e) => {
                    const updated = [...jsonData.quizDefinition.quiz.content];
                    updated[index].title = e.target.value;
                    setJsonData({ ...jsonData, quizDefinition: { ...jsonData.quizDefinition, quiz: { ...jsonData.quizDefinition.quiz, content: updated } } });
                  }} />

                  <label>Body</label>
                  <input className="input" value={item.body || ''} onChange={(e) => {
                    const updated = [...jsonData.quizDefinition.quiz.content];
                    updated[index].body = e.target.value;
                    setJsonData({ ...jsonData, quizDefinition: { ...jsonData.quizDefinition, quiz: { ...jsonData.quizDefinition.quiz, content: updated } } });
                  }} />

                  {item['$']?.type === 'choice' && Array.isArray(item.option) && (
                    <div>
                      <label>Options</label>
                      {item.option.map((opt: string, optIndex: number) => (
                        <input key={optIndex} className="input" type="text" value={opt} onChange={(e) => {
                          const updated = [...jsonData.quizDefinition.quiz.content];
                          updated[index].option[optIndex] = e.target.value;
                          setJsonData({ ...jsonData, quizDefinition: { ...jsonData.quizDefinition, quiz: { ...jsonData.quizDefinition.quiz, content: updated } } });
                        }} />
                      ))}
                    </div>
                  )}

                  <button className="delete-btn" type="button" onClick={() => handleDelete(index)}>
                    ❌ Delete
                  </button>
                </form>

                {/* 👁️ Live Preview */}
                <div className="question-preview">
                  <div
                    className="preview-box"
                    style={{
                      backgroundImage: `url("/media/${item['$']?.background || 'default.jpg'})`,
                    }}
                  >
                    <p className="preview-type">[{item['$']?.type?.toUpperCase() || 'UNKNOWN'}]</p>
                    <h4 className="preview-title">{item.title || 'Untitled Question'}</h4>
                    <p className="preview-body">{item.body || 'No body text'}</p>
                  </div>
                </div>
              </div>
            ))}

          <button className="download-btn" onClick={downloadXML}>
            💾 Download Edited XML
          </button>
        </>
      )}
    </div>
  );
}

export default App;
