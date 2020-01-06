import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-component';
import { getBalance } from '../../store/user';
import { getValue } from '../../store/value';
import colors from "../../style";

const BalanceText = styled.div`
    color: ${colors.secondary};
    font-size: 24px;
    display: flex;
    width: 100%;
    margin: 0 auto;
`;

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

class Balance extends Component{
    render(){
        return(
            <Container>
                <BalanceText>
                    <b>{this.props.userBalance}</b>&nbsp; SAT
                </BalanceText>
                <BalanceText style={{opacity: "0.8", fontSize: '20px'}}>
                    <b>{Math.floor(((this.props.userBalance / 100000000) *
                        this.props.current) * 100) / 100}</b>&nbsp; USD
                </BalanceText>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userBalance: getBalance(state),
    current: getValue(state) || 0
});

export default connect(mapStateToProps(Balance))