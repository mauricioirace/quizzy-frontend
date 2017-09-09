import React from 'react';
import { Callout ,Row,Column} from 'react-foundation';

class FetchedMatch extends React.PureComponent {
    render() {
        console.log(this.props.match);
        let players = [];
        for(let i in this.props.match.players) {
            players.push(<div>{this.props.match.players[i]} <br/></div>)
        }

        return (
            <div>
                <Row className="display">
                    <Column small={3} large={3}>IMAGE</Column>

                    <Column small={9} large={9}>
                        <Callout>
                            <Row className="display">
                                <Column>
                                    <h3>{this.props.match.game.name}</h3>
                                    <h5>
                                        Mode: {this.props.match.isRealTime
                                                ? 'Real Time'
                                                : 'Normal' }
                                    </h5>
                                </Column>
                            </Row>
                            <Row className="display">
                                <Column small={3} large={3}>
                                    <p>{ this.props.match.game.description }</p>
                                </Column>
                                <Column small={9} large={9}>
                                    <p>{ players }</p>
                                </Column>
                            </Row>
                        </Callout>
                    </Column>
                </Row>
                <br/>
            <Row>
                <Column small={4} large={4}>
                    <input type="text" placeholder="insert your nick"  />
                </Column>
            </Row>
            </div>
    );

    }
}

export default FetchedMatch;
