import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { BsPerson } from "react-icons/bs";
import {RiTeamLine } from "react-icons/ri";
import {HiOutlineMail } from "react-icons/hi";
import {MdOutlinePersonalInjury,MdOutlineMarkEmailUnread } from "react-icons/md";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TiUserAddOutline } from "react-icons/ti"

const MainScreen = () => {
  const { userInfo } = useSelector((state) => state.auth) 
  return (
    <>
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <Link style={{ textDecoration: 'none' }} to="/profile" className="custom-card">
          <Card className="mb-3 h-100">
            <Card.Body>
              <BsPerson size={30} />
              <Card.Title>Profile</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Link style={{ textDecoration: 'none' }} to="/" className="custom-card">
          <Card className="mb-3 h-100">
            <Card.Body>
              <MdOutlinePersonalInjury size={30} />
              <Card.Title>Injured List</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      {userInfo && !userInfo.isAdmin && (
      <Col xs={12} md={6} lg={4}>
        <Link style={{ textDecoration: 'none' }} to="/contactus" className="custom-card">
          <Card className="mb-3 h-100">
            <Card.Body>
              <HiOutlineMail size={30} />
              <Card.Title>Send Message</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>)}
      {userInfo && userInfo.isAdmin && (
      <Col xs={12} md={6} lg={4}>
        <Link style={{ textDecoration: 'none' }} to="/admin/productlist" className="custom-card">
          <Card className="mb-3 h-100">
            <Card.Body>
              <TiUserAddOutline size={30} />
              <Card.Title>Add Injury</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>)}
    </Row>
    {userInfo && userInfo.isAdmin && (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <Link style={{ textDecoration: 'none' }} to="/admin/userlist" className="custom-card">
          <Card className="mb-3 h-100">
            <Card.Body>
              <RiTeamLine size={30} />
              <Card.Title>Player List</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Link style={{ textDecoration: 'none' }} to="/admin/messagelist" className="custom-card">
          <Card className="mb-3 h-100">
            <Card.Body>
              <MdOutlineMarkEmailUnread size={30} />
              <Card.Title>Messages</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      <Col xs={12} md={6} lg={4}>
      </Col>
    </Row>)}
 
    </>
  )
}

export default MainScreen
