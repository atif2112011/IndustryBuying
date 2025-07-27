import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "remixicon/fonts/remixicon.css";
import { useAlert } from "../../contexts/AlertContext";

const EditCategoryModal = ({ isOpen, onClose, onSave, category}) => {
  const [name, setName] = useState("");
  const [technicalAspects, setTechnicalAspects] = useState([]);
  const { setMessage, setShowSnackBar } = useAlert();

  useEffect(() => {
    (category && category.name)?setName(category.name):
    setName("");
    (category && category.subcategories)?setTechnicalAspects(category.subcategories):
    setTechnicalAspects([]);
  }, [category]);
  

  if (!isOpen) return null;

  // console.log(`Menu recieved`,menu)

  const validateInput = () => {
    if (!name || technicalAspects.length === 0) {
      setMessage("Please fill all the required fields");
      setShowSnackBar(true);
      return false;
    }
    // console.log('tags',tags)
    return true;
  };

  const handleAddTechDetail = () => {
    setTechnicalAspects([...technicalAspects, { name: "", _id:""}]);
  };

  const handleTechDetailChange = (index, field, value) => {
    const updated = [...technicalAspects];
    updated[index][field] = value;
    setTechnicalAspects(updated);
  };

  const handleDeleteTechDetail = (index) => {
    const updated = [...technicalAspects];
    updated.splice(index, 1);
    setTechnicalAspects(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[95%] overflow-auto p-6 shadow-lg">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-md md:text-lg font-semibold mb-4">
            Add Category
          </h2>
          <i
            className="ri-close-line cursor-pointer text-blue-950 text-2xl"
            onClick={onClose}
          ></i>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
          <TextField
            label="Category Name *"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-12">
          <div className="flex items-center justify-between mb-2">
            <h3 className="!text-md md:!text-lg !font-medium">
              Create Subcategories *
            </h3>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddTechDetail}
            >
              Add
            </Button>
          </div>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Subcategory Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {technicalAspects &&
                  technicalAspects.length > 0 &&
                  technicalAspects.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          size="small"
                          value={detail.name}
                          onChange={(e) =>
                            handleTechDetailChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteTechDetail(index)}
                        >
                          <i className="ri-delete-bin-line text-red-600 text-md md:text-lg"></i>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={()=>{onClose(),setTechnicalAspects([]),setName('')}} variant="outlined" size="small">
            Cancel
          </Button>
          <Button
            onClick={() =>
              validateInput() &&
              onSave({
                
                name,
                
                subcategories:technicalAspects,
              })
            }
            variant="contained"
            color="primary"
            size="small"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
