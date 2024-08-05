import React, { useState, useEffect } from "react";
import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import axios from "axios";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    total_sqft: '',
    location: '',
    bhk: '',
    bath: '',
  });
  const [errors, setErrors] = useState({});
  const [warning, setWarning] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const exchangeRate = 83.71; // Updated exchange rate

  useEffect(() => {
    axios.get('http://localhost:5000/get_location_names')
      .then(response => {
        setLocations(response.data.locations);
      })
      .catch(error => {
        console.error('There was an error fetching the location names!', error);
      });

    axios.get('http://localhost:5000/get_total_properties')
      .then(response => {
        setTotalProperties(response.data.total_properties);
      })
      .catch(error => {
        console.error('There was an error fetching the total properties!', error);
      });

    axios.get('http://localhost:5000/get_total_places')
      .then(response => {
        setTotalPlaces(response.data.total_places);
      })
      .catch(error => {
        console.error('There was an error fetching the total places!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === "total_sqft" && value < 300) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };

  const validate = () => {
    let errors = {};

    if (!formData.total_sqft) {
      errors.total_sqft = 'Total square feet is required';
    } else if (formData.total_sqft < 300 || formData.total_sqft > 10000) {
      errors.total_sqft = 'Total square feet must be between 300 and 10000';
    }

    if (!formData.location) {
      errors.location = 'Location is required';
    }

    if (!formData.bath) {
      errors.bath = 'Bathrooms are required';
    } else if (formData.bath < 1 || formData.bath > 10) {
      errors.bath = 'Bathrooms must be between 1 and 10';
    }

    if (!formData.bhk) {
      errors.bhk = 'Bedrooms are required';
    } else if (formData.bhk < 1 || formData.bhk > 10) {
      errors.bhk = 'Bedrooms must be between 1 and 10';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      axios.post('http://localhost:5000/predict_home_price', formData)
        .then(response => {
          setEstimatedPrice(response.data.estimated_price);
        })
        .catch(error => {
          console.error('There was an error predicting the home price!', error);
        });
    }
  };

  const lakhToDollars = (lakh, exchangeRate) => {
    return (lakh * 100000) / exchangeRate;
  };

  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* Left Section */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                type: "spring",
              }}
              style={{ fontWeight: "800" }}
            >
              Let's
              <br />
              Find Your
              <br />
              Dream House
            </motion.h1>
          </div>

          <div className="flexColStart hero-des">
            <span className="secondaryText">
              Find a variety of properties in your budget and location.
            </span>
            <span className="secondaryText">
              We have properties in all locations and price ranges.
            </span>
          </div>

          <div className="flexColStart">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                ref={btnRef}
                bg="black" // Set the background color to black
                color="white" // Set the text color to white for better contrast
                variant="solid"
                borderRadius="full"
                boxShadow="lg"
                _hover={{ bg: "gray.700" }} // Background color when hovered
                _active={{ bg: "gray.600" }}
                onClick={onOpen}
                sx={{
                  fontSize: "15px",
                  width: "250px",
                  height: "50px",
                }}
              >
                Estimate Price
              </Button>
              <Tooltip
                label="Click to estimate the price of your home based on the details you provide."
                aria-label="A tooltip"
                placement="right"
                className="custom-tooltip" // Add custom class
              >
                <span>
                  <InfoOutlineIcon
                    style={{
                      marginLeft: "20px",
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                </span>
              </Tooltip>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Predict Home Price</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {warning && (
                    <Alert status="warning" mb={4}>
                      <AlertIcon />
                      Total square feet should be at least 300.
                    </Alert>
                  )}
                  <FormControl isInvalid={errors.total_sqft}>
                    <Text fontSize="sl" mb={2}>
                      Total Square Feet
                    </Text>
                    <NumberInput
                      defaultValue={300}
                      max={10000}
                      mb={4}
                      value={formData.total_sqft}
                      onChange={(valueString) =>
                        handleNumberChange("total_sqft", valueString)
                      }
                    >
                      <NumberInputField name="total_sqft" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.total_sqft}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.location}>
                    <Text fontSize="sl" mb={2}>
                      Location
                    </Text>
                    <Select
                      placeholder="Select location"
                      mb={4}
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    >
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.location}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.bath}>
                    <Text fontSize="sl" mb={2}>
                      Bathrooms
                    </Text>
                    <NumberInput
                      defaultValue={0}
                      min={1}
                      max={10}
                      mb={4}
                      value={formData.bath}
                      onChange={(valueString) =>
                        handleNumberChange("bath", valueString)
                      }
                    >
                      <NumberInputField name="bath" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.bath}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.bhk}>
                    <Text fontSize="sl" mb={2}>
                      Bedrooms
                    </Text>
                    <NumberInput
                      defaultValue={0}
                      min={1}
                      max={10}
                      mb={4}
                      value={formData.bhk}
                      onChange={(valueString) =>
                        handleNumberChange("bhk", valueString)
                      }
                    >
                      <NumberInputField name="bhk" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.bhk}</FormErrorMessage>
                  </FormControl>
                  {estimatedPrice && (
                    <Text mt={4} fontSize="xl">
                      Estimated Price: $
                      {lakhToDollars(estimatedPrice, exchangeRate).toFixed(2)}
                    </Text>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    bg="black" // Background color of the button
                    color="white" // Text color of the button
                    boxShadow="lg"
                    _hover={{ bg: "gray.700" }} // Background color when hovered
                    _active={{ bg: "gray.600" }} // Background color when active (pressed)
                    onClick={handleSubmit}
                  >
                    Predict
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>

          <div className="flexCenter stats">
            <div className="flexColStart stat">
              <span>
                <CountUp end={totalPlaces} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Locations</span>
            </div>

            <div className="flexColStart stat">
              <span>
                <CountUp end={totalProperties} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Properties</span>
            </div>

            <div className="flexColStart stat">
              <span>
                <CountUp start={1050} end={1200} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Properties Sold</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ y: "7rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "spring",
            }}
            className="image-container2"
          >
            <img src="./Untitled-1.png" alt="hero" />
            <div className="shape shape1"></div>
            <div className="shape shape2"></div>
            <div className="shape shape3"></div>
            <div className="shape shape4"></div>
            <div className="shape shape5"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
