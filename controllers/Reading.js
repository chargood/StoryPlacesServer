/* *****************************************************************************
 *
 * StoryPlaces
 *

This application was developed as part of the Leverhulme Trust funded 
StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk

Copyright (c) 2016
  University of Southampton
    Charlie Hargood, cah07r.ecs.soton.ac.uk
    Kevin Puplett, k.e.puplett.soton.ac.uk
	David Pepper, d.pepper.soton.ac.uk

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * The name of the Universities of Southampton nor the name of its 
	  contributors may be used to endorse or promote products derived from 
	  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE ABOVE COPYRIGHT HOLDERS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

***************************************************************************** */

"use strict";

var CoreSchema = require('../models/coreschema');

exports.create = create;
exports.index = index;
exports.update = update;
exports.fetch = fetch;

function create(req, res, next) {

    var reading = new CoreSchema.Reading(req.body);

    reading.save(function (err) {
        if (err) {
            err.status = 400;
            err.clientMessage = "Unable To save reading";
            return next(err);
        }

        res.json(reading);
    });
}

function index(req, res, next) {
    CoreSchema.Reading.find(function (err, readings) {
        if (err) {
            return next(err);
        }

        res.json(readings);
    });
}

function fetch(req, res, next) {
    CoreSchema.Reading.findById(req.params.reading_id, function (err, reading) {
        if (!reading) {
            err.status = 404;
            err.clientMessage = "Reading not found";
            return next(err);
        }

        if (err) {
            return next(err);
        }

        res.json(reading);
    });
}

function update(req, res, next) {
    CoreSchema.Reading.findByIdAndUpdate(req.params.reading_id, {variables: req.body.variables}, function (err, reading) {
        if (!reading) {
            err.status = 400;
            err.clientMessage = "Unable To update reading";
            return next(err);
        }

        if (err) {
            return next(err);
        }

        res.json(reading);
    });
}