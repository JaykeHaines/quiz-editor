
import { useState } from 'react';

// Define all expected setting keys
export type Settings = Record<string, string>;

interface SettingsEditorProps {
  settings: Settings;
  onSave: (updated: Settings) => void;
}

export default function SettingsEditor({ settings, onSave }: SettingsEditorProps) {
  const [local, setLocal] = useState<Settings>({ ...settings });

  const update = (key: string, value: string) => {
    setLocal((prev: Settings) => ({ ...prev, [key]: value }));
  };

  const hexFromInt = (intColor: string) => {
    try {
      return '#' + parseInt(intColor).toString(16).padStart(6, '0');
    } catch {
      return '#000000';
    }
  };

  const intFromHex = (hex: string) => '0x' + hex.replace('#', '');

  const renderColorInput = (label: string, key: string) => (
    <>
      <label>{label}</label>
      <div className="color-picker">
        <input
          type="color"
          value={hexFromInt(local[key])}
          onChange={(e) => update(key, intFromHex(e.target.value))}
        />
        <input
          className="input"
          value={local[key]}
          onChange={(e) => update(key, e.target.value)}
        />
      </div>
    </>
  );

  const renderFileInput = (label: string, key: string, accept: string) => (
    <>
      <label>{label}</label>
      <div className="file-input-row">
        <input
          className="input"
          value={local[key]}
          onChange={(e) => update(key, e.target.value)}
        />
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) update(key, file.name);
          }}
        />
      </div>
    </>
  );

  return (
    <div className="settings-editor">
      <h2>⚙️ Global Settings</h2>

      <h3>🎨 Backgrounds</h3>
      {renderFileInput('Holding Background', 'holdingBackground', '.jpg,.png')}
      {renderFileInput('Round Background', 'roundBackground', '.jpg,.png')}
      {renderFileInput('Question Background', 'questionBackground', '.jpg,.png')}
      {renderFileInput('Scoreboard Background', 'scoreboardBackground', '.jpg,.png')}

      <h3>🔤 Fonts & Colours</h3>
      <label>Title Font</label>
      <input className="input" value={local.titleFont} onChange={(e) => update('titleFont', e.target.value)} />
      <label>Body Font</label>
      <input className="input" value={local.bodyFont} onChange={(e) => update('bodyFont', e.target.value)} />
      {renderColorInput('Title Colour', 'titleColour')}
      {renderColorInput('Body Colour', 'bodyColour')}

      <h3>✅ Scoring</h3>
      <label>Correct Score</label>
      <input className="input" value={local.questionScore} onChange={(e) => update('questionScore', e.target.value)} />
      <label>Incorrect Score</label>
      <input className="input" value={local.questionIncorrectScore} onChange={(e) => update('questionIncorrectScore', e.target.value)} />
      {renderColorInput('Correct Highlight Colour', 'highlightCorrect')}
      {renderColorInput('Bar Colour 1', 'barColour1')}
      {renderColorInput('Bar Colour 2', 'barColour2')}
      {renderFileInput('Correct Answer Sound', 'correctAnswerSound', '.mp3')}

      <h3>⏱️ Countdown</h3>
      <label>Countdown Length</label>
      <input className="input" value={local.countdownLength} onChange={(e) => update('countdownLength', e.target.value)} />
      {renderFileInput('Timer Sound', 'timerSound', '.mp3')}
      {renderFileInput('Timer Complete Sound', 'timerCompleteSound', '.mp3')}
      {renderColorInput('Countdown Text Colour', 'countdownTextColour')}
      {renderColorInput('Countdown Back Colour', 'countdownBackColour')}
      {renderColorInput('Countdown Pie Colour', 'countdownPieColour')}

      <h3>🧾 Scoreboard</h3>
      {renderColorInput('Scoreboard Pos Colour', 'scoreboardPosColour')}
      {renderColorInput('Scoreboard Pos Text Colour', 'scoreboardPosTextColour')}
      {renderColorInput('Scoreboard Background Colour', 'scoreboardBackColour')}
      {renderColorInput('Scoreboard Text Colour', 'scoreboardTextColour')}

      <h3>📱 iPad Text</h3>
      <label>Team Name Response</label>
      <input className="input" value={local.iPadTeamNameResponse} onChange={(e) => update('iPadTeamNameResponse', e.target.value)} />
      <label>Question Number Text</label>
      <input className="input" value={local.iPadQuestionNumText} onChange={(e) => update('iPadQuestionNumText', e.target.value)} />
      <label>Vote Waiting</label>
      <input className="input" value={local.iPadVoteWaiting} onChange={(e) => update('iPadVoteWaiting', e.target.value)} />
      <label>Vote Open</label>
      <input className="input" value={local.iPadVoteOpen} onChange={(e) => update('iPadVoteOpen', e.target.value)} />
      <label>Vote Closed</label>
      <input className="input" value={local.iPadVoteClosed} onChange={(e) => update('iPadVoteClosed', e.target.value)} />
      <label>Vote Received</label>
      <input className="input" value={local.iPadVoteReceived} onChange={(e) => update('iPadVoteReceived', e.target.value)} />
      <label>Submit Button</label>
      <input className="input" value={local.iPadSubmit} onChange={(e) => update('iPadSubmit', e.target.value)} />

      <h3>📱 iPad Backgrounds</h3>
      {renderFileInput('iPad Holding Background', 'iPadHoldingBackground', '.jpg,.png')}
      {renderFileInput('iPad Round Background', 'iPadRoundBackground', '.jpg,.png')}
      {renderFileInput('iPad Question Background', 'iPadQuestionBackground', '.jpg,.png')}

      <h3>🌐 Web Settings</h3>
      {renderColorInput('Web Header Background', 'webHeaderBackgroundColour')}
      {renderColorInput('Web Background Colour', 'webBackgroundColour')}
      {renderFileInput('Web Holding Background', 'webHoldingBackground', '.jpg,.png')}
      {renderFileInput('Web Round Background', 'webRoundBackground', '.jpg,.png')}
      {renderFileInput('Web Question Background', 'webQuestionBackground', '.jpg,.png')}

      <button className="download-btn" style={{ marginTop: '1rem' }} onClick={() => onSave(local)}>
        ✅ Save Global Settings
      </button>
    </div>
  );
}
