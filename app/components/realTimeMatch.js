import React from 'react';

class RealTimeMatch extends React.PureComponent {
  render() {
    return (
      <div>
        quizzy.com/<input type='text' name='match_name' placeholder='match name'/> <button>SHARE</button><br/>
        <button>PLAY</button>
        <table style="width:100%">
          <tr>
            <th>Players</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>Pepe</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Tito</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    )
  }
}

export default RealTimeMatch;
