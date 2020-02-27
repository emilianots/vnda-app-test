import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import {
    Inbox,
    ShoppingCart,
    FormatListBulleted,
    LocalOffer,
    Person,
    TurnedIn,
    AccountTree,
    Description,
    YouTube
} from "@material-ui/icons";

export default class SideMenu extends Component {

    render() {
        return (
            <div className="side-menu">

                <List >
                    <ListItem button>
                        <ListItemIcon>
                            <Inbox />
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