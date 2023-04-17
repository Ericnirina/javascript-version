// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { Delete } from '@mui/icons-material'
import TocIcon from '@mui/icons-material/Toc';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EventIcon from '@mui/icons-material/Event';

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
      title: 'Toutes les informations',
      path: '/tables',
      icon: TocIcon
    },
    
    {
      title: 'Ajout information',
      path: '/info-add',
      icon: NoteAddIcon
    },
    {
      title: 'Modifier ou supprimer information',
      path: '/update-info',
      icon: BorderColorIcon
    },
    {
      title: 'Modifier utilisateurs',
      path: '/update-user',
      icon: ManageAccountsIcon
    },
    {
      title: 'Agenda',
      path: '/agenda',
      icon: EventIcon
    },
  ]
}

export default navigation
