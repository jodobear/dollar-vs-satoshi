import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

import store from "./store"
import User from "./components/user"
import Balance from "./components/balance"
import Value from "./components/value"
import Bet from "./components/bet"
import Scene from "./components/scene"
import colors from "./style"
import Dollar from "./assets/dollar.png"