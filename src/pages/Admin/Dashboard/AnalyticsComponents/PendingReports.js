import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from "../../../../css/Styles.module.css"
import CustomLink from '../../../../components/CustomLink'
import DataGridCustomers from '../../Users/CustomersShopComponents/DataGridCustomers'


function PendingReports() {
  return (
    <Box direction={"row"} sx={{ ...classes.sectionName }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      textAlign: 'justify',
      gap: '13.3rem',
  }}>
      <Typography variant="sectionTitle">Pending User Reports
      </Typography>
      <Box className= {`${styles.grow}`}>
                    <CustomLink to ="/admin/reports"> {"See All"}</CustomLink>
                </Box>
    </Box>
    <DataGridCustomers></DataGridCustomers>
    {/*TODO: Add onClick for Button */}
  </Box>
  )
}
const classes = {}
export default PendingReports