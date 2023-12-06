import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from "../../../../css/Styles.module.css"
import CustomLink from '../../../../components/CustomLink'
import DataGridAds from '../../LokalAds/LokalAdsComponents/DataGridAds'

function LokalAdsRequest() {
  return (
    <Box direction={"row"} sx={{ ...classes.sectionName }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      textAlign: 'justify',
      gap: '8rem'
  }}>
      <Typography variant="sectionTitle">Lokal Ads Approval Requests
      </Typography>
      <Box className= {`${styles.grow}`}>
                    <CustomLink to ="/admin/lokal_ads"> {"See All"}</CustomLink>
                </Box>
      
        
    </Box>
    <DataGridAds></DataGridAds>
    {/*TODO: Add onClick for Button */}
  </Box>
  )
}
const classes = {}
export default LokalAdsRequest