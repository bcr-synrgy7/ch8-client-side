import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../../section/Admin/dashboardSection';
import FormAddComponent from '../../components/Admin/formAddComponent';
import Breadcrumb from '../../components/Admin/breadcrumbComponent';
import { Car } from '../../contexts/carsContext';
import { useCarsContext } from '../../hooks/useCars';
import feather from 'feather-icons';

const UpdateCarPage: React.FC = () => {
  const { fetchCarById } = useCarsContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const carId = queryParams.get('id');
  const [carData, setCarData] = useState<Car | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    feather.replace();
  }, [carData]);

  useEffect(() => {
    if (carId) {
      fetchCarById(carId)
        .then((data) => {
          if (data) {
            setCarData(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching car data:', error);
          setLoading(false);
        });
    }
  }, [carId, fetchCarById]);

  return (
    <Dashboard
      activePage="cars"
      content={
        <>
          <Breadcrumb
            breadcrumbs={[
              { label: 'Cars', path: '/cars' },
              { label: 'List Cars', path: '/cardashboard' },
              { label: 'Update Car', path: '' }, // Ubah ini sesuai dengan path yang sesuai
            ]}
          />
          <h4>Update Car</h4>
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '50vh' }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <FormAddComponent carData={carData} />
          )}
        </>
      }
    />
  );
};

export default UpdateCarPage;
