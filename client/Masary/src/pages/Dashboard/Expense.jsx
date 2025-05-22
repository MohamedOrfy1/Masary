import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import toast from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert';

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({show: false, data: null});

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if(response.data) {
        setExpenseData(response.data);
        console.log('Fetched expenseData:', response.data);
      }
    } catch (error) {
      console.log(error);
    } finally { 
      setLoading(false);
    }

  }

  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense;
    if(!category || !category.trim()){
      toast.error("Category is required");
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

    const payload = { category, amount, date, icon };
    console.log('Expense being sent:', payload);
    try {
      const response = await axiosInstance.post(
        `${API_PATHS.EXPENSE.ADD_EXPENSE}`,
        payload
      );
      console.log('Add expense response:', response.data);
      if(response.data){
        toast.success("Expense added successfully");
        setOpenAddExpenseModal(false);
        fetchExpenseData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Expense deleted successfully");
      fetchExpenseData();
    } catch (error) {
      console.log(error);
    }



  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: 'blob',
        }

      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('download', 'expense-details.xlsx');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully");
      
    } catch (error) {
      console.log(error);
    }

  }



  useEffect(() => {
    fetchExpenseData();

    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-1'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData.data || []}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData.data || []}
            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title='Add Expense'
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
          ></AddExpenseForm>
        </Modal>



        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title={
            `Delete Expense`} 
        >
          <DeleteAlert
            content={`Are you sure you want to delete this expense?`}
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            
          />
          
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
