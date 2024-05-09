import { useEffect, useRef, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FoodServices from "../services/FoodServices";
import { toast } from "react-toastify";

const DataForms = (props) => {
  const [formData, setFormData] = useState(props.foodData);
  const formRef = useRef(null);

  useEffect(() => {
    setFormData(props.foodData);
  }, [props.foodData]);

  const onSubmitForm = (e, id = "") => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData.entries());
    if (id == "") {
      FoodServices.foodCreate(formDataObj).then((res) => {
        if (res.status == 'success') {
            toast.success(res.message, {
                position: "top-right",
            });
            props.dataFetch();
            formRef.current.reset();
            setFormData(null);
        }else{
            toast.error(res.message, {
                position: "top-right",
              });
        }
      });
    } else {
      FoodServices.foodUpdateById(id, formDataObj).then((res) => {
        if (res.status == 'success') {
            setFormData(null);
            toast.success(res.message, {
                position: "top-right",
            });
            setFormData({
                foodName: '',
                foodCode: '',
                price: '',
                foodImageUrl:''
            });
            props.dataFetch();
        }else{
            toast.error(res.message, {
                position: "top-right",
              });
        }
        
      });
    }
    
  };

 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Row>
        <Col>
          <div className="page-title">
            <h4>Food Form</h4>
          </div>
        </Col>
      </Row>
      <div className="w-100 content-body border p-3">
        <Form
          ref={formRef}
          className="custom-form"
          onSubmit={(e) => onSubmitForm(e, formData?._id)}
        >
          <Row>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Food Code</Form.Label>
                <Form.Control
                  type="text"
                  name="foodCode"
                  required
                  value={formData?.foodCode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Food Name</Form.Label>
                <Form.Control
                  type="text"
                  name="foodName"
                  required
                  value={formData?.foodName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  name="price"
                  required
                  value={formData?.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  name="foodImageUrl"
                  required
                  value={formData?.foodImageUrl}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button
                variant="primary"
                className="custom-primary-button float-end"
                type="submit"
                value="Submit"
                size="sm"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default DataForms;
