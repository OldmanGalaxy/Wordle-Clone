export default function Keyboard() {
    return (
        <>
        <div className='keyboard-container'>
            <div className='keyboard-display'>
                <div className="keyboard-row1">
                    <div className="key q">Q</div>
                    <div className="key w">W</div>
                    <div className="key e">E</div>
                    <div className="key r">R</div>
                    <div className="key t">T</div>
                    <div className="key y">Y</div>
                    <div className="key u">U</div>
                    <div className="key i">I</div>
                    <div className="key o">O</div>
                    <div className="key p">P</div>
                </div>
                <div className="keyboard-row2">
                    <div className="key a">A</div>
                    <div className="key s">S</div>
                    <div className="key d">D</div>
                    <div className="key f">F</div>
                    <div className="key g">G</div>
                    <div className="key h">H</div>
                    <div className="key j">J</div>
                    <div className="key k">K</div>
                    <div className="key l">L</div>
                </div>
                <div className="keyboard-row3">
                    <div className="enter">ENTER</div>
                    <div className="key z">Z</div>
                    <div className="key x">X</div>
                    <div className="key c">C</div>
                    <div className="key v">V</div>
                    <div className="key b">B</div>
                    <div className="key n">N</div>
                    <div className="key m">M</div>
                    <div className="delete">
                        <i class="material-icons">backspace</i>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}