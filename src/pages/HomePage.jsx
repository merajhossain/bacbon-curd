import { useEffect, useState } from "react";
import DataForms from "../components/DataForm";
import { Alert, Col, Container, Row } from "react-bootstrap";
import FoodServices from "../services/FoodServices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const HomePage = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [singleRowData, setSingleRowData] = useState(null);

  const allFoodsFetch = () => {
    FoodServices.getAllFoods().then((res) => {
      if (res.status == "success") {
        setAllFoods(res.data);
        toast.success("Data Found", {
          position: "top-right",
        });
      } else {
        toast.error("No Data Found", {
          position: "top-right",
        });
      }
    });
  };

  useEffect(() => {
    allFoodsFetch();
  }, []);

  const onEditAction = (id) => {
    FoodServices.getSingleFood(id).then((res) => {
      setSingleRowData(res.data[0]);
    });
  };
  const onSubmitDelete = (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          FoodServices.foodDeleteById(id).then((res) => {
            if (res.status == "success") {
              allFoodsFetch();
            }
          });
        }
      });
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  return (
    <Container className="p-5">
      <Row>
        <Col md={8}>
          <Row>
            <Col>
              <div className="page-title">
                <h4>Food List</h4>
              </div>
            </Col>
          </Row>
          <div className="table-responsive custom-height-scroll">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#Code</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allFoods.length > 0 ? (
                  allFoods.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.foodCode}</td>
                        <td>
                          <img
                            src={item?.foodImageUrl}
                            className="list-image"
                          />
                        </td>
                        <td>{item?.foodName}</td>
                        <td>{item?.price}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              onClick={() => onEditAction(item?._id)}
                              className="btn btn-primary btn-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => onSubmitDelete(item?._id)}
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <Alert variant="danger">Sorry! No Data Found</Alert>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Col>
        <Col md={4}>
          <div className="custom-position-sticky">
            <DataForms dataFetch={allFoodsFetch} foodData={singleRowData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
