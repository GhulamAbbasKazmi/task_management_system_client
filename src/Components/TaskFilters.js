import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../Redux/slice/taskSlice';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { status, dueDate } = useSelector(state => state.tasks.filters);

  const handleStatusChange = (e) => {
    dispatch(setFilters({ status: e.target.value }));
  };

  const handleDueDateChange = (e) => {
    dispatch(setFilters({ dueDate: e.target.value }));
  };

  return (
    <div style={styles.filterContainer}>
      <h3 style={styles.filterTitle}>Filter Tasks</h3>
      <div style={styles.filterGroup}>
        <label style={styles.label}>
          <strong>Status:</strong>
          <select value={status} onChange={handleStatusChange} style={styles.select}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label style={{ ...styles.label, marginLeft: "1rem" }}>
          <strong>Due Date:</strong>
          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            style={styles.dateInput}
          />
        </label>
      </div>
    </div>
  );
};

const styles = {
  filterContainer: {
    backgroundColor: '#f8f9fa',
    padding: '1rem 2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  },
  filterTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#495057',
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  label: {
    fontSize: '1rem',
    color: '#495057',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    width: '150px',
    boxSizing: 'border-box',
  },
  dateInput: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    width: '180px',
    boxSizing: 'border-box',
  }
};

export default TaskFilters;
