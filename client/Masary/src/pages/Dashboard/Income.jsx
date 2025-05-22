import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layouts/DeleteAlert';
const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(
    {
      show: false,
      data: null,
    }
  );

  const fetchIncomeData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if(response.data) {
        setIncomeData(response.data);
        console.log('Fetched incomeData:', response.data);
      }
    } catch (error) {
      console.log(error);
    } finally { 
      setLoading(false);
    }

  }

  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income;
    if(!source || !source.trim()){
      toast.error("Source is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Invalid amount");
      return;
    }

    if(!date){
      toast.error("Date is required");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `${API_PATHS.INCOME.ADD_INCOME}`,
        {
          source,
          amount,
          date,
          icon,
        }
      );
      console.log('Add income response:', response.data);
      if(response.data){
        toast.success("Income added successfully");
        setOpenAddIncomeModal(false);
        fetchIncomeData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income deleted successfully");
      fetchIncomeData();
    } catch (error) {
      console.log(error);
    }



  }

  const handleDownloadIncomeDetails = async () => {}



  useEffect(() => {
    fetchIncomeData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu='Income'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-1'>
          <div className=''>
            <IncomeOverview 
              transactions={incomeData.data || []}
              onAddIncome={() => setOpenAddIncomeModal(true)}

            />
          </div>

          <IncomeList 
            transactions={incomeData.data || []}
            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
            onDownloadIncomeDetails={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title='Add Income'
        >
        <div>
          <AddIncomeForm 
            onAddIncome={handleAddIncome}
          />
        </div>
          
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title={
            `Delete Income`} 
        >
          <DeleteAlert
            content={`Are you sure you want to delete this income?`}
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            
          />
          
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
