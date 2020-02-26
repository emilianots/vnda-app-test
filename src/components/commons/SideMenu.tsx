import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import InboxIcon from '@material-ui/icons/Inbox';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Person from '@material-ui/icons/Person';
import TurnedIn from '@material-ui/icons/TurnedIn';
import AccountTree from '@material-ui/icons/AccountTree';
import Description from '@material-ui/icons/Description';
import YouTube from '@material-ui/icons/YouTube';

export default class SideMenu extends Component {

    render() {
        return (
            <div className="side-menu">

                <List >
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pedidos" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ShoppingCart />
                        </ListItemIcon>
                        <ListItemText primary="Carrinho" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FormatListBulleted />
                        </ListItemIcon>
                        <ListItemText primary="Produtos" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <LocalOffer />
                        </ListItemIcon>
                        <ListItemText primary="Tags" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Clientes" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <TurnedIn />
                        </ListItemIcon>
                        <ListItemText primary="Promoções" />
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountTree />
                        </ListItemIcon>
                        <ListItemText primary="Menu" />
                    </ListItem><ListItem button>
                        <ListItemIcon>
                            <Description />
                        </ListItemIcon>
                        <ListItemText primary="Paginas" />
                    </ListItem><ListItem button>
                        <ListItemIcon>
                            <YouTube />
                        </ListItemIcon>
                        <ListItemText primary="Banners" />
                    </ListItem>
                </List>

            </div>

        )
    }
}
/* <div className="side-menu">
                <div className="main-options">
                    <a href="/">
                        Pedidos
                        </a>
                    <a href="/">
                        Carrinho
                        </a>
                    <a href="/">
                        Produtos
                        </a>
                    <a href="/">
                        Tags
                        </a>
                    <a href="/">
                        Clientes
                        </a>
                    <a href="/">
                        Promoções
                        </a>
                </div>

                <div className="main-options navigation-options">
                    <a href="/">Menu</a>
                    <a href="/">Paginas</a>
                    <a href="/">Banners</a>
                </div>
            </div> */