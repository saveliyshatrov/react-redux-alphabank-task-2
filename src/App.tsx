import React, {useState} from 'react';
import {connect} from 'react-redux'
import './App.css';
import * as actions from './actions'
import {Button, Card, Col, Container, FormControl, InputGroup, Row, Table} from 'react-bootstrap';
import { bindActionCreators } from 'redux';

function App(props:any) {
    const [elemName, setElemName] = useState('')
    const [nameSort, setNameSort] = useState(false)
    const [priceSort, setPriceSort] = useState(false)
    const [elemPrice, setElemPrice] = useState(0)
    const [newElemName, setNewElemName] = useState('')
    const [newElemPrice, setNewElemPrice] = useState(0)
    const [elemId, setElemId] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [blockEditButton1, setBlockEditButton1] = useState(false)
    const [blockEditButton2, setBlockEditButton2] = useState(false)
    const [blockAddButton1, setBlockAddButton1] = useState(true)
    const [blockAddButton2, setBlockAddButton2] = useState(true)
    const sumAllPrice = ():number => {
        let sum = 0
        for(let i = 0; i < props.state.length; i++){
            sum+=props.state[i].price
        }
        return sum
    }
    const createElements = () => {
      let arr = []
      for(let i = 0; i < props.state.length; i++){
          arr.push(
              <tr>
                  <td>{props.state[i].name}</td>
                  <td>{props.state[i].price}$</td>
                  <td>
                      <Button variant={'warning'}
                              onClick={()=>{
                          setShowModal(true)
                          setNewElemName(props.state[i].name)
                          setNewElemPrice(props.state[i].price)
                          setElemId(props.state[i].id)
                      }}>Edit</Button>
                  </td>
                  <td>
                      <Button variant={'danger'}
                              onClick={()=>{
                          props.remove(props.state[i].name, props.state[i].price, props.state[i].id)
                      }}>Delete</Button>
                  </td>
              </tr>
          )
      }
      return arr
  }
    return (
      <>
          <Card style={{display: `${showModal?'':'none'}`,position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px'}}>
              <Card.Body>
                  <Card.Title>
                      Editing
                  </Card.Title>
                  <Card.Text>
                      <Row md={12} className={'mb-3 mt-3'}>
                          <Col md={6}>
                              <InputGroup>
                                  <FormControl
                                      placeholder="Name"
                                      aria-label="Name"
                                      onChange={e => {
                                          if(e.target.value === ''){
                                              setNewElemName(e.target.value)
                                              setBlockEditButton1(true)
                                          } else {
                                              setNewElemName(e.target.value)
                                              setBlockEditButton1(false)
                                          }
                                      }}
                                      value={newElemName}
                                  />
                              </InputGroup>
                          </Col>
                          <Col md={6}>
                              <InputGroup>
                                  <FormControl
                                      placeholder="Price"
                                      aria-label="Price"
                                      type={'number'}
                                      onChange={e => {
                                          if(e.target.value === '' || parseInt(e.target.value) === 0){
                                              setNewElemPrice(parseInt(e.target.value))
                                              setBlockEditButton2(true)
                                          } else {
                                              setNewElemPrice(parseInt(e.target.value))
                                              setBlockEditButton2(false)
                                          }
                                      }}
                                      value={newElemPrice}
                                  />
                              </InputGroup>
                          </Col>
                      </Row>
                  </Card.Text>
                  <Row md={12}>
                      <Col md={6}>
                          <Button className={'w-100'}
                                  variant={'outline-danger'}
                                  onClick={()=>{
                                      setShowModal(false)
                          }}>Cancel</Button>
                      </Col>
                      <Col md={6}>
                          <Button className={'w-100'}
                                  variant={'warning'}
                                  disabled={blockEditButton1 || blockEditButton2}
                                  onClick={()=>{
                                      props.edit(newElemName, newElemPrice, elemId)
                                      setElemId(0)
                                      setShowModal(false)
                          }}>Edit</Button>
                      </Col>
                  </Row>
              </Card.Body>
          </Card>
          <Container>
              <Row md={12} className={'mb-3 mt-3'}>
                  <Col md={2}>
                      <InputGroup>
                          <FormControl
                              placeholder="Name"
                              aria-label="Name"
                              onChange={e => {
                                  if(e.target.value === ''){
                                      setBlockAddButton1(true)
                                  } else {
                                      setBlockAddButton1(false)
                                      setElemName(e.target.value)
                                  }
                              }}
                              value={elemName}
                          />
                      </InputGroup>
                  </Col>
                  <Col md={2}>
                      <InputGroup>
                          <FormControl
                              placeholder="Price"
                              aria-label="Price"
                              type={'number'}
                              onChange={e => {
                                  if(e.target.value === '' || parseInt(e.target.value) === 0){
                                      setBlockAddButton2(true)
                                  } else {
                                      setBlockAddButton2(false)
                                      setElemPrice(parseInt(e.target.value))
                                  }
                              }}
                              value={elemPrice}
                          />
                      </InputGroup>
                  </Col>
                  <Col md={1}>
                      <Button variant={'outline-success'}
                              disabled={(blockAddButton1 || blockAddButton2)}
                              onClick={()=>{
                                  setBlockAddButton1(true)
                                  setBlockAddButton2(true)
                              props.add(elemName, elemPrice)
                              setElemName('')
                              setElemPrice(0)
                      }}>Add</Button>
                  </Col>
              </Row>
              <Table hover>
                  <thead className={'bg-light'}>
                  <th className={'pointer w-25'} onClick={()=>{
                      if(nameSort){
                          props.z_a_sort()
                      } else {
                          props.a_z_sort()
                      }
                      setNameSort(!nameSort)
                  }}>Name</th>
                  <th className={'pointer w-25'} onClick={()=>{
                      if(priceSort){
                          props.small_to_big_sort()
                      } else {
                          props.big_to_small_sort()
                      }
                      setPriceSort(!priceSort)
                  }}>Price</th>
                  <th className={'w-25'}></th>
                  <th className={'w-25'}></th>
                  </thead>
                  <tbody>
                  {createElements()}
                  </tbody>
                  <tr className={'bg-success'}>
                      <td className={'text-white'}>TOTAL</td>
                      <td className={'text-white'}>{sumAllPrice()}$</td>
                      <td></td>
                      <td></td>
                  </tr>
              </Table>
          </Container>
      </>
    );
}
const mapDispatchToProps = (dispatch:any) => {
    return bindActionCreators(actions, dispatch)
}
export default connect(state => ({
    state: state
}), mapDispatchToProps)(App);
