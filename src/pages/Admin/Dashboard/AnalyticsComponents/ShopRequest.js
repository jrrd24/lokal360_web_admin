import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from "../../../../css/Styles.module.css"
import CustomLink from '../../../../components/CustomLink'
import DataGridCustomers from '../../Users/CustomersShopComponents/DataGridCustomers'



function ShopRequest() {
  return (
    <Box direction={"row"} sx={{ ...classes.sectionName }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'justify',
                gap: '12rem'
            }}>
                <Typography variant="sectionTitle">Shop Approval Requests
                </Typography>
                <Box className= {`${styles.grow}`}>
                    <CustomLink to ="/admin/shop_management"> {"See All"}</CustomLink>
                </Box>
              </Box>
              {/*TODO: Add onClick for Button */}
           
            </Box>
  )
}
const classes = {}
export default ShopRequest