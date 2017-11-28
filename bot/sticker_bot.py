# -*- coding: utf-8 -*-

import telegram

with open('token.txt', 'r') as f:
    robot = telegram.Bot(token=f.read())
