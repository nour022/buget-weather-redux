import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearExpenses, addExpense } from "../reducers/budgetReducers";
import { setLanguage } from "../reducers/languageReducers";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

const BudgetTracker = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.budget.expenses);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState("");

  const handleLanguageChange = (event) => {
    dispatch(setLanguage(event.target.value));
    i18n.changeLanguage(event.target.value);
  };

  const handleAddExpense = (event) => {
    event.preventDefault();

    if (!amount || !to || !info || !date) {
      alert("Please fill in all fields");
      return;
    }

    const newExpense = {
      amount: parseFloat(amount),
      to: to.trim(),
      info: info.trim(),
      date: date,
    };
    dispatch(addExpense(newExpense));

    setAmount("");
    setTo("");
    setInfo("");
    setDate("");
  };

  const handleClearExpenses = () => {
    dispatch(clearExpenses());
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>{t("budgetTracker")}</h1>
        </Col>
        <Col>
          <Form.Select
            value={currentLanguage}
            onChange={handleLanguageChange}
            className="float-end"
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="ar">العربية</option>
          </Form.Select>
        </Col>
      </Row>
      <Form onSubmit={handleAddExpense}>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="to">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="me-2">
          <FaPlus /> {t("addExpense")}
        </Button>
        <Button variant="danger" onClick={handleClearExpenses}>
          <FaTrash /> {t("clearRecords")}
        </Button>
      </Form>
      <Row className="mt-4">
        {expenses.map((expense, index) => (
          <Col key={index} md={4}>
            <Card className="expense mb-3">
              <Card.Body>
                <Card.Title>
                  <b>To:</b> {expense.to}
                </Card.Title>
                <Card.Text>
                  <b>Date:</b> {expense.date}
                </Card.Text>
                <Card.Text>
                  <b>Amount:</b> ${expense.amount}
                </Card.Text>
                <Card.Text>
                  <b>Note:</b> {expense.info}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BudgetTracker;
