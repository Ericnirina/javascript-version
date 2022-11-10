// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    // {
    //   sectionTitle: 'User Interface'
    // },
    {
      title: 'Création du compte',
      icon: HomeOutline,
      path: '/form-layouts'
    },
    {
      title: 'Utilisateurs',
      path: '/tables',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Listes des Affaires',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
  ]
}

export default navigation