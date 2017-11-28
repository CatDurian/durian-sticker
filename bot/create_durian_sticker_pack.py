# -*- coding: utf-8 -*-

import os
import csv
from sticker_bot import robot

png_path = os.path.join(os.path.dirname(__file__), '../png-compressed')


def upload():
    with open('../stickers.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            file = open(os.path.join(png_path, '{}-fs8.png'.format(row['name'])), 'rb')
            robot.addStickerToSet(
                user_id='339123641',
                name='cute_durian_by_duriansticker_bot',
                png_sticker=file,
                emojis=row['emoji'],
                timeout=5000
            )
            file.close()


def delete():
    sticker_set = robot.getStickerSet(name='cute_durian_by_duriansticker_bot')
    for sticker in sticker_set.stickers:
        robot.deleteStickerFromSet(
            sticker=sticker.file_id,
            timeout=5000
        )


def upload_zip():
    file = open(os.path.join(png_path, '../stickers.csv'), 'rb')
    robot.sendDocument(
        chat_id='-271832458',
        document=file
    )
    file.close()


if __name__ == '__main__':
    print('Removing old stickers.')
    delete()
    print('Uploading new stickers.')
    upload()
    print('Sending stickers to group.')
    upload_zip()
