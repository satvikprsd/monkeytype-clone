import Type from "./Type";
export default function Main() {
    return (
      <div className="main">
        <div className="parentnavbar">
        <div className="navbar">
          <div className="pun_num">
            <button className="navbutton pun"><p>punctuation</p></button>
            <button className="navbutton num"><p>numbers</p></button>
          </div>
          <div className="navspacer"></div>
          <div className="mode">
            <button className="navbutton time"><p>time</p></button>
            <button className="navbutton words"><p>words</p></button>
            <button className="navbutton coding"><p>coding</p></button>
            <button className="navbutton custom"><p>custom</p></button>
          </div>
          <div className="navspacer"></div>
          <div className="modeval">
            <button className="navbutton"><p>15</p></button>
            <button className="navbutton"><p>30</p></button>
            <button className="navbutton"><p>60</p></button>
            <button className="navbutton"><p>120</p></button>
          </div>
        </div>
        </div>
        <div className="type">
          <Type />
          </div>
      </div>
    );
  }
  